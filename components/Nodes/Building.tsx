import { Group } from "@shopify/react-native-skia";

import { Building } from "@/constants/types";

import { NodeRendererProps } from "./Renderer";
import { PathRenderer } from "./Path";

export function BuildingRenderer(
  { node: building }: NodeRendererProps<Building>,
) {
  if (!building.path) return null;

  return (
    <Group blendMode="multiply">
      <PathRenderer
        path={building.path}
        closePath
      />
    </Group>
  );
}
