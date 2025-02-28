import { Group } from "@shopify/react-native-skia";

import { NodeRenderer2Props, Wall } from "@/constants/types2";

import { PathRenderer } from "./path";

export function WallRenderer({ node: wall }: NodeRenderer2Props<Wall>) {
  return (
    <Group key={wall.name} blendMode="multiply">
      <PathRenderer
        path={wall.path}
      />
    </Group>
  );
}
