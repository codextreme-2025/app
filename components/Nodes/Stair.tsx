import { Group, Line, Rect } from "@shopify/react-native-skia";

import { Stair } from "@/constants/types";

import { NodeRendererProps } from "./Renderer";

export function StairRenderer({ node: stair }: NodeRendererProps<Stair>) {
  const [x, y] = stair.position;
  const [width, height] = stair.size;

  const numSteps = height / 5;
  const stepSpacing = height / numSteps;

  const stepLines = Array(numSteps - 1)
    .fill(0)
    .map((_, index) => {
      const stepY = y + stepSpacing * (index + 1);
      return (
        <Line
          key={`step-${index}`}
          p1={{ x, y: stepY }}
          p2={{ x: x + width, y: stepY }}
          color="black"
          style="stroke"
          strokeWidth={1}
        />
      );
    });

  return (
    <Group key={stair.name} blendMode="multiply">
      {/* Stair background */}
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        color="#D3D3D3" // Light gray color for stairs
        style="fill"
      />

      {/* Stair border */}
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        color="gray"
        style="stroke"
        strokeWidth={2}
      />

      {/* Step lines */}
      {stepLines}
    </Group>
  );
}
