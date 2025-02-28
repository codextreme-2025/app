import { Group } from "@shopify/react-native-skia";

import { Hole, NodeRendererProps } from "@/constants/types";

import { PathRenderer } from "./path";

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
