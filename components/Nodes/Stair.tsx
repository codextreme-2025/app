import { Group, Line, Rect } from "@shopify/react-native-skia";
import { Orientation, Stair } from "@/constants/types";
import { NodeRendererProps } from "./Renderer";

export function StairRenderer({ node: stair }: NodeRendererProps<Stair>) {
  const [x, y] = stair.position;
  const [width, height] = stair.size;
  const orientation = stair.orientation || Orientation.DOWN;

  const isHorizontal = orientation === Orientation.LEFT ||
    orientation === Orientation.RIGHT;
  const stairWidth = isHorizontal ? height : width;
  const stairHeight = isHorizontal ? width : height;

  const numSteps = isHorizontal ? stairWidth / 5 : stairHeight / 5;
  const stepSpacing = isHorizontal
    ? stairWidth / numSteps
    : stairHeight / numSteps;

  const stepLines = Array(Math.floor(numSteps) - 1)
    .fill(0)
    .map((_, index) => {
      if (isHorizontal) {
        // Horizontal stairs (LEFT or RIGHT)
        const stepX = orientation === Orientation.RIGHT
          ? x + stepSpacing * (index + 1)
          : x + stairWidth - stepSpacing * (index + 1);
        return (
          <Line
            key={`step-${index}`}
            p1={{ x: stepX, y }}
            p2={{ x: stepX, y: y + stairHeight }}
            color="black"
            style="stroke"
            strokeWidth={1}
          />
        );
      } else {
        // Vertical stairs (UP or DOWN)
        const stepY = orientation === Orientation.DOWN
          ? y + stepSpacing * (index + 1)
          : y + stairHeight - stepSpacing * (index + 1);
        return (
          <Line
            key={`step-${index}`}
            p1={{ x, y: stepY }}
            p2={{ x: x + stairWidth, y: stepY }}
            color="black"
            style="stroke"
            strokeWidth={1}
          />
        );
      }
    });

  return (
    <Group key={stair.name} blendMode="multiply">
      {/* Stair background */}
      <Rect
        x={x}
        y={y}
        width={stairWidth}
        height={stairHeight}
        color="#D3D3D3" // Light gray color for stairs
        style="fill"
      />

      {/* Stair border */}
      <Rect
        x={x}
        y={y}
        width={stairWidth}
        height={stairHeight}
        color="gray"
        style="stroke"
        strokeWidth={2}
      />

      {/* Step lines */}
      {stepLines}
    </Group>
  );
}
