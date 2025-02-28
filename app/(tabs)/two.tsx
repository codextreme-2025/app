import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import {
  Canvas,
  Group,
  listFontFamilies,
  matchFont,
  Rect,
  Text as SkiaText,
} from "@shopify/react-native-skia";

const fontFamily = Platform.select({ ios: "Helvetica", default: "serif" });
const fontStyle = {
  fontFamily,
  fontSize: 14,
  fontStyle: "italic",
  fontWeight: "bold",
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
  subType?: "classroom";
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
];

export default function TabTwoScreen() {
  const width = 400;
  const height = 400;
  const r = width * 0.33;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Canvas style={{ width, height }}>
        {classes.map((classRoom) => {
          const [x, y] = classRoom.position;
          const [width, height] = classRoom.size;

          const textSize = font.measureText(classRoom.name);

          return (
            <Group blendMode="multiply">
              <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                color="pink"
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
                text={classRoom.name}
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
