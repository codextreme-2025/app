import { CallbackSinkNode, GraphBuilder, ModelBuilder } from "@openhps/core";
// import { GeospatialAccuracy } from "@openhps/geospatial";
import { GeolocationSourceNode } from "@openhps/react-native";

async function something() {
  // Create a positioning model
  const geolocationShape = GraphBuilder.create()
    .from(new GeolocationSourceNode({}))
    .to(new CallbackSinkNode((frame => {
      console.log(frame);
    })));

  const modelService = await ModelBuilder
    .create()
    .addShape(geolocationShape)
    .build();

  console.log(modelService);
}

something();
