import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

import { SkiaPanningZooming } from "@/components/PanZoom";

import { campus } from "@/constants/Campus";
import { FloorRenderer } from "@/components/map/floor";
import { PathRenderer } from "@/components/map/path";

export default function MapScreen() {
  const width = 400;
  const height = 700;

  const firstBuilding = campus.buildings[0];
  const firstFloor = firstBuilding.floors[1];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entreprise Commons</Text>
      <SkiaPanningZooming width={width} height={height}>
        <FloorRenderer
          node={firstFloor}
          building={firstBuilding}
        />
        <PathRenderer
          path={[
            [100, -50],
            [190, -50],
            [190, 10],
            [330, 10],
            [330, 130],
            [490, 130],
            [490, 250],
            [510, 250],
          ]}
          color="green"
          dotted
        />
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
