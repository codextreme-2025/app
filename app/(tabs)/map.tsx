import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

import { SkiaPanningZooming } from "@/components/PanZoom";

import { campus } from "@/constants/Campus";
import { FloorRenderer } from "@/components/map/floor";

export default function MapScreen() {
  const width = 400;
  const height = 700;

  const firstBuilding = campus.buildings[0];
  const firstFloor = firstBuilding.floors[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entreprise Commons</Text>
      <SkiaPanningZooming width={width} height={height}>
        <FloorRenderer node={firstFloor} stairs={firstBuilding.stairs ?? []} />
      </SkiaPanningZooming>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
