import { Platform, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

import {
  Canvas,
  Group,
  matchFont,
  Rect,
  Text as SkiaText,
} from "@shopify/react-native-skia";

const fontFamily = Platform.select({ ios: "Helvetica", default: "sans-serif" });
const fontStyle = {
  fontFamily,
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: "normal",
} as const;
const font = matchFont(fontStyle);

export interface Node {
  type: string;
}

export interface Building extends Node {
  type: "building";
}

export interface Room extends Node {
  type: "room";
  name: string;
  subType?: "classroom" | "toilet";
  position: [number, number];
  size: [number, number];
}

export const classes: Room[] = [
  {
    type: "room",
    name: "Guinea",
    subType: "classroom",
    position: [0, 100],
    size: [100, 100],
  },
  {
    type: "room",
    name: "Mozambique",
    subType: "classroom",
    position: [200, 0],
    size: [100, 100],
  },
  {
    type: "room",
    name: "Malawi",
    subType: "classroom",
    position: [300, 0],
    size: [100, 100],
  },
  {
    type: "room",
    name: "Gambia",
    subType: "classroom",
    position: [0, 500],
    size: [100, 100],
  },
  {
    type: "room",
    name: "Liberia",
    subType: "classroom",
    position: [100, 500],
    size: [100, 100],
  },
];

export const toilets: Room[] = [
  {
    type: "room",
    name: "Toilets",
    subType: "toilet",
    position: [180, 100],
    size: [140, 50],
  },
];

const allRooms = [
  ...classes,
  ...toilets,
];

export default function MapScreen() {
  const width = 400;
  const height = 700;
  const r = width * 0.33;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entreprise Commons</Text>
      <Canvas style={{ width, height }}>
        {allRooms.map((room) => {
          const [x, y] = room.position;
          const [width, height] = room.size;

          const textSize = font.measureText(room.name);

          const color = room.subType === "classroom" ? "pink" : "violet";

          return (
            <Group key={room.name} blendMode="multiply">
              <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                color={color}
                style="fill"
              />
              <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                color="black"
                style="stroke"
                strokeWidth={2}
              />
              <SkiaText
                font={font}
                x={x + (width / 2 - textSize.width / 2)}
                y={y + (height / 2 + textSize.height / 2)}
                text={room.name}
              />
            </Group>
          );
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
