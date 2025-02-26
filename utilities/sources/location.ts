import {
  Absolute3DPosition,
  Accuracy1D,
  DataFrame,
  DataObject,
  LengthUnit,
  PullOptions,
  SourceNode,
} from "@openhps/core";

import * as Location from "expo-location";

export class ExpoGeolocationSourceNode<Out extends DataFrame>
  extends SourceNode<Out> {
  // ...
  constructor() {
    super(new DataObject("expo-geolocation"));

    this.init();
  }

  private async init() {
    const permission = await Location.getForegroundPermissionsAsync();

    let canAskAgain = true, granted = permission.granted;

    while (canAskAgain) {
      const result = await Location.requestForegroundPermissionsAsync();

      canAskAgain = result.canAskAgain;
      granted = result.granted;

      if (granted) break;
    }

    if (!granted) throw new Error("Location permission not granted!");

    this.pull();
  }

  public async onPull(options?: PullOptions): Promise<Out> {
    const location = await Location.getCurrentPositionAsync({ accuracy: 6 });

    const position = new Absolute3DPosition(
      location.coords.latitude,
      location.coords.longitude,
      location.coords.altitude ?? 0,
    );

    position.accuracy = new Accuracy1D(
      location.coords.accuracy ?? 0,
      LengthUnit.METER,
    );

    const dataObject = new DataObject(
      this.source.uid + "_" + location.timestamp,
    );
    dataObject.position = position;

    const dataFrame = new DataFrame(dataObject);

    return dataFrame as Out;
  }
}
