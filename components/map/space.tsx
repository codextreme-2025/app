import { Group, Rect, Text } from "@shopify/react-native-skia";

import { NodeRenderer2Props, RectSpace, Space } from "@/constants/types2";

import { font } from "./font";
import { PathRenderer } from "./path";

function isRectSpace(space: Space): space is RectSpace {
  return "position" in space;
}

const nodeColorMap = new Map<Space["subType"], string>([
  ["classroom", "pink"],
  ["library", "crimson"],
  ["toilet", "violet"],
  ["office", "yellow"],
  ["wellness", "green"],
]);

export function SpaceRenderer({ node }: NodeRenderer2Props<Space>) {
  let x: number, y: number, width: number, height: number;

  if (isRectSpace(node)) {
    [x, y] = node.position;
    [width, height] = node.size;
  } else {
    [x, y] = node.path[0];
    [width, height] = node.path.reduce(
      (
        [ax, ay],
        [cx, cy],
      ) => [Math.max(ax, cx - x), Math.max(ay, cy - y)],
      [0, 0],
    );
    y += 30;
  }

  const textSize = font.measureText(node.name);

  const color = nodeColorMap.get(node.subType) ??
    "lightgray";

  return (
    <Group blendMode="multiply">
      {isRectSpace(node)
        ? (
          <>
            <Rect
              x={x}
              y={y}
              width={width}
              height={height}
              color={color}
              style="fill"
            />
            {node.spaceType !== "open" &&
              (
                <Rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  color="gray"
                  style="stroke"
                  strokeWidth={2}
                />
              )}
          </>
        )
        : (
          <>
            <PathRenderer
              path={node.path}
              color={color}
              style="fill"
            />
            {node.spaceType !== "open" &&
              (
                <PathRenderer
                  path={node.path}
                  color="gray"
                  closePath
                  style="stroke"
                />
              )}
          </>
        )}
      <Text
        font={font}
        x={x + (width / 2 - textSize.width / 2)}
        y={y + (height / 2 + textSize.height / 2)}
        text={node.name}
      />
    </Group>
  );
}
