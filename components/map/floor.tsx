import { Group } from "@shopify/react-native-skia";

import { Building, Floor, NodeRendererProps } from "@/constants/types";

import { PathRenderer } from "./path";
import { SpaceRenderer } from "./space";
import { StairRenderer } from "./stair";
import { WallRenderer } from "./wall";
import { HoleRenderer } from "./hole";

export interface FloorRendererProps extends NodeRendererProps<Floor> {
  building: Building;
}

export function FloorRenderer(
  {
    node,
    building,
  }: FloorRendererProps,
) {
  const floorStairs = building.stairs
    ? building.stairs.map((stair) => {
      const baseFloor = building.floors.find((floor) =>
        floor.level === stair.floors[0]
      );

      return {
        ...stair,
        offset: baseFloor?.offset,
      };
    })
    : [];

  return (
    <>
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
        {node.holes && node.holes.map((hole) => {
          return <HoleRenderer key={hole.id} node={hole} />;
        })}
      </Group>

      {floorStairs.map((stair) => {
        return (
          <Group
            key={stair.id}
            blendMode="multiply"
            transform={[
              // { translateX: stair.offset?.[0] ?? 0 },
              // { translateY: stair.offset?.[1] ?? 0 },
            ]}
          >
            <StairRenderer node={stair} />
          </Group>
        );
      })}
    </>
  );
}
