import { LocationModelLocation } from "../types";

import * as Location from "expo-location";

async function requestPermissions() {
  const permission = await Location.getForegroundPermissionsAsync();

  let canAskAgain = true, granted = permission.granted;

  while (canAskAgain) {
    const result = await Location.requestForegroundPermissionsAsync();

    canAskAgain = result.canAskAgain;
    granted = result.granted;

    if (granted) break;
  }

  if (!granted) throw new Error("Location permission not granted!");
}

export async function getCurrentLocation(): Promise<LocationModelLocation> {
  await requestPermissions();

  const location = await Location.getCurrentPositionAsync({ accuracy: 6 });

  return {
    x: location.coords.latitude,
    y: location.coords.longitude,
    building: 0,
    floor: 0,
  };
}
