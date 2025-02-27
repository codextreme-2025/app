import {
  Absolute2DPosition,
  Absolute3DPosition,
  DataFrame,
  DataObject,
  DataObjectService,
  DataSerializer,
  GraphBuilder,
  MemoryDataService,
  Model,
  ModelBuilder,
} from "@openhps/core";
import {
  DistanceFunction,
  Fingerprint,
  FingerprintingNode,
  FingerprintService,
  KNNFingerprintingNode,
  WeightFunction,
} from "@openhps/fingerprinting";

import { PowerUnit, RelativeRSSI } from "@openhps/rf";

import { LocationModelLocation, LocationModelSignal } from "./types";

class FloorDataObject extends DataObject {
  floor: null | number = null;
  building = 0;
  /// @ts-expect-error weird
  position: Absolute3DPosition;

  constructor(uid: string) {
    super(uid);

    this.position = new Absolute3DPosition();
  }

  setFloor(floor: number) {
    this.position ??= new Absolute3DPosition();

    this.position.z = floor;
  }

  getFloor() {
    this.position ??= new Absolute3DPosition();

    return this.position.z;
  }

  getBuilding() {
    return this.building;
  }

  setBuilding(building: number) {
    this.building = building;
  }
}

DataSerializer.registerType(FloorDataObject, {
  members: {
    floor: Number,
    building: Number,
  },
});

export class LocationModel {
  dataObjectDriver = new MemoryDataService(DataObject);
  fingerprintDriver = new MemoryDataService(Fingerprint);

  buildModel() {
    return ModelBuilder.create()
      .addService(new DataObjectService(this.dataObjectDriver))
      .addService(
        new FingerprintService(this.fingerprintDriver, {
          defaultValue: -95,
          autoUpdate: true,
        }),
      )
      .addShape(
        GraphBuilder.create()
          .from("offline")
          .via(new FingerprintingNode())
          .to(),
      ).addShape(
        GraphBuilder.create() // Online stage
          .from("online")
          .via(
            new KNNFingerprintingNode({
              k: 3,
              weighted: true,
              weightFunction: WeightFunction.SQUARE,
              similarityFunction: DistanceFunction.EUCLIDEAN,
            }),
          )
          .to(
            // new CallbackSinkNode((frame) => {
            //   // Alternatively, you can use a callback sink node to handle the output
            //   console.info(
            //     "CallbackSinkNode: processed frame:",
            //     frame.source.getPosition(),
            //   );
            // }),
          ),
      )
      .build();
  }

  pipeline!: Model<DataFrame, DataFrame>;

  constructor() {
    this.buildModel()
      .then((pipeline) => {
        this.pipeline = pipeline;
      });
  }

  async addFingerprint(
    location: LocationModelLocation,
    signals: LocationModelSignal[],
  ) {
    const obj = new FloorDataObject(`refpoint_${Date.now()}`);
    obj.setPosition(new Absolute2DPosition(location.x, location.y));
    obj.setFloor(location.floor);
    obj.setBuilding(location.building);

    signals.forEach((signal) => {
      const rssi = new RelativeRSSI();
      rssi.referenceObjectUID = signal.bssid;
      rssi.referenceValue = signal.rssi;
      rssi.unit = PowerUnit.dBm;
      obj.addRelativePosition(rssi);
    });

    const frame = new DataFrame(obj as unknown as DataObject);

    try {
      await this.pipeline.findNodeByName("offline").push(frame);

      await this.pipeline.findDataService(FloorDataObject).insert(obj.uid, obj);

      return "Fingerprint added";
    } catch (error) {
      throw "Error saving fingerprint";
    }
  }

  async getFingerprints() {
    try {
      const service = this.pipeline.findService(FingerprintService);
      const fingerprints = await service.findAll();

      return fingerprints;
    } catch (error) {
      throw "Error retrieving fingerprints";
    }
  }

  async clearDatabase() {
    try {
      const dataObjectService = this.pipeline.findService(DataObjectService);
      const fingerprintService = this.pipeline.findService(FingerprintService);

      // Clear DataObject collection
      await dataObjectService.deleteAll({});

      // Clear Fingerprint collection
      await fingerprintService.deleteAll({});

      return "Database cleared";
    } catch (error) {
      throw "Error clearing database";
    }
  }

  async myPosition(signals: LocationModelSignal[]) {
    const obj = new FloorDataObject(`refpoint_${Date.now()}`);
    // We do not know the position yet
    // We do not know these either, just guessing
    obj.setBuilding(0);
    obj.setFloor(0);

    signals.forEach((signal) => {
      const rssi = new RelativeRSSI();
      rssi.referenceObjectUID = signal.bssid;
      rssi.referenceValue = signal.rssi;
      rssi.unit = PowerUnit.dBm;
      obj.addRelativePosition(rssi);
    });

    const frame = new DataFrame(obj as unknown as DataObject);

    return new Promise<LocationModelLocation>((resolve, reject) => {
      const onlineSource = this.pipeline.findNodeByName("online");

      onlineSource.onceCompleted(frame.uid)
        .then(async () => {
          // Get it from the data service/mongodb
          const processedObject = await this.pipeline.findDataService(
            DataObject,
          )
            .findByUID(obj.uid) as unknown as FloorDataObject;
          if (!processedObject) {
            throw new Error(`DataObject with identifier ${obj.uid} not found!`);
          }

          const location = processedObject.getPosition() as Absolute3DPosition;

          // Return
          resolve({
            x: location.x,
            y: location.y,
            floor: processedObject.getFloor(),
            building: processedObject.getBuilding(),
          });
        });

      onlineSource.push(frame);
    });
  }
}
