import { Group, Line, vec } from "@shopify/react-native-skia";

import { Wall } from "@/constants/types";

import { NodeRendererProps } from "./Renderer";
import { PathRenderer } from "./Path";

export function WallRenderer({ node: wall }: NodeRendererProps<Wall>) {
  return (
    <Group key={wall.name} blendMode="multiply">
      <PathRenderer
        path={[
          wall.from,
          ...(wall.via ?? []),
          wall.to,
        ]}
      />
    </Group>
  );
}
