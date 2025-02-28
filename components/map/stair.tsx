import { Group, Line, Rect } from "@shopify/react-native-skia";
import { NodeRenderer2Props, Stair } from "@/constants/types2";

export function StairRenderer({ node }: NodeRenderer2Props<Stair>) {
  const [x, y] = node.position;
  const width = 20;
  const length = node.length;

  const isHorizontal = node.orientation && node.orientation === "horizontal";
  const stairWidth = isHorizontal ? length : width;
  const stairHeight = isHorizontal ? width : length;

  const numSteps = isHorizontal ? stairWidth / 5 : stairHeight / 5;
  const stepSpacing = isHorizontal
    ? stairWidth / numSteps
    : stairHeight / numSteps;

  const stepLines = Array(Math.floor(numSteps) - 1)
    .fill(0)
    .map((_, index) => {
      if (isHorizontal) {
        // Horizontal stairs (LEFT or RIGHT)
        const stepX = true
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
        const stepY = true
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
    <Group key={node.name} blendMode="multiply">
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
