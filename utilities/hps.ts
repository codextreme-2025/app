import "react-native-get-random-values";

import {
  CallbackSinkNode,
  DataObject,
  GraphBuilder,
  ModelBuilder,
} from "@openhps/core";

import { ExpoGeolocationSourceNode } from "./sources/location";
import { WLANSourceNode } from "./sources/wifi";

export async function getService() {
  const geolocationShape = GraphBuilder.create()
    .from(new ExpoGeolocationSourceNode())
    .to(
      new CallbackSinkNode((frame) => {
        console.log(frame.getObjects()[0]);
      }),
    );

  const wifiShape = GraphBuilder.create()
    .from(
      new WLANSourceNode({
        source: new DataObject("idk" + "_wlan"),
        name: "wlan-source",
        interval: 0,
        persistence: false,
      }),
    )
    .to(
      new CallbackSinkNode((frame) => {
        console.log("got WLAN Source Nodes");
        console.log(frame.getObjects()[0].relativePositions);
      }),
    );

  const modelService = await ModelBuilder
    .create()
    .withLogger((level: string, log: any) => {
      console.log("message", level, log);
    })
    .addShape(geolocationShape)
    .addShape(wifiShape)
    .build();

  return modelService;
}
