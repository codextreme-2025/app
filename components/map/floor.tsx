import { Group } from "@shopify/react-native-skia";

import { Floor, NodeRenderer2Props, Stair } from "@/constants/types2";

import { PathRenderer } from "./path";
import { SpaceRenderer } from "./space";
import { StairRenderer } from "./stair";
import { WallRenderer } from "./wall";

export function FloorRenderer(
  { node, stairs }: NodeRenderer2Props<Floor> & { stairs: Stair[] },
) {
  return (
    <Group
      blendMode="multiply"
      transform={[
        { translateX: node.offset?.[0] ?? 0 },
        { translateY: node.offset?.[1] ?? 0 },
      ]}
    >
      <PathRenderer
        path={node.path}
        closePath
      />
      {node.spaces.map((space) => {
        return <SpaceRenderer key={space.id} node={space} />;
      })}
      {node.walls && node.walls.map((wall) => {
        return <WallRenderer key={wall.id} node={wall} />;
      })}
      {stairs.map((stair) => {
        return <StairRenderer key={stair.id} node={stair} />;
      })}
    </Group>
  );
}
