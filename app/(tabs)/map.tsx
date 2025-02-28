import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

import { allRooms } from "@/constants/plan";
import { NodeRenderer } from "@/components/Nodes/Renderer";
import { SkiaPanningZooming } from "@/components/PanZoom";

export default function MapScreen() {
  const width = 400;
  const height = 700;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entreprise Commons</Text>
      <SkiaPanningZooming width={width} height={height}>
        {allRooms.map((node) => {
          return <NodeRenderer key={node.type + "-" + node.name} node={node} />;
        })}
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
