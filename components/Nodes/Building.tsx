import { Group, Path, Skia } from "@shopify/react-native-skia";

import { Building } from "@/constants/types";

import { NodeRendererProps } from "./Renderer";

export function BuildingRenderer(
  { node: building }: NodeRendererProps<Building>,
) {
  let skiaPath = Skia.Path.Make();

  if (building.path) {
    building.path.forEach(([x, y], i) => {
      if (i === 0) {
        skiaPath.moveTo(x, y);
      } else {
        skiaPath.lineTo(x, y);
      }
    });
  }

  skiaPath.close();

  return (
    <Group blendMode="multiply">
      <Path
        path={skiaPath}
        color="black"
        style="stroke"
        strokeWidth={3}
      />
    </Group>
  );
}
