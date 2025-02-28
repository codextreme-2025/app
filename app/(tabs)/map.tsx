import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

import { Canvas } from "@shopify/react-native-skia";
import { allRooms } from "@/constants/plan";
import { NodeRenderer } from "@/components/Nodes/Renderer";

export default function MapScreen() {
  const width = 400;
  const height = 700;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entreprise Commons</Text>
      <Canvas style={{ width, height }}>
        {allRooms.map((node) => {
          return <NodeRenderer key={node.type + "-" + node.name} node={node} />;
        })}
      </Canvas>
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
