import { Group } from "@shopify/react-native-skia";

import { Building, NodeRendererProps } from "@/constants/types";

export function BuildingRenderer({ node }: NodeRendererProps<Building>) {
  return (
    <Group
      blendMode="multiply"
      transform={[
        { translateX: node.offset?.[0] ?? 0 },
        { translateY: node.offset?.[1] ?? 0 },
      ]}
    >
    </Group>
  );
}
