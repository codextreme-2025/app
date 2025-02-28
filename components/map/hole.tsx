import { Group } from "@shopify/react-native-skia";

import { Hole, NodeRenderer2Props } from "@/constants/types2";

import { PathRenderer } from "./path";

export function HoleRenderer({ node: hole }: NodeRenderer2Props<Hole>) {
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
