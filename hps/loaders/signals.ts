import WifiManager from "react-native-wifi-reborn";

import { LocationModelSignal } from "../types";

export async function getCurrentSignals(): Promise<LocationModelSignal[]> {
  const wifiList = await WifiManager.reScanAndLoadWifiList()
    .catch(() => WifiManager.loadWifiList());

  // const wifiList = await WifiManager.loadWifiList();

  return wifiList.map((wifiEntry) => {
    return {
      bssid: wifiEntry.BSSID,
      rssi: wifiEntry.level,
    };
  });
}
