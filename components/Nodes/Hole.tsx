import { Group } from "@shopify/react-native-skia";

import { Hole } from "@/constants/types";

import { NodeRendererProps } from "./Renderer";
import { PathRenderer } from "./Path";

export function HoleRenderer({ node: hole }: NodeRendererProps<Hole>) {
  return (
    <Group key={hole.name} blendMode="multiply">
      <PathRenderer
        path={hole.path}
        color="skyblue"
        style="fill"
        closePath
      />
    </Group>
  );
}
