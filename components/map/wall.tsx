import { Group } from "@shopify/react-native-skia";

import { NodeRendererProps, Wall } from "@/constants/types";

import { PathRenderer } from "./path";

export function WallRenderer({ node: wall }: NodeRendererProps<Wall>) {
  return (
    <Group key={wall.name} blendMode="multiply">
      <PathRenderer
        path={wall.path}
      />
    </Group>
  );
}
