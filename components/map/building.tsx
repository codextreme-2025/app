import { Group } from "@shopify/react-native-skia";

import { Building, NodeRenderer2Props } from "@/constants/types2";

export function BuildingRenderer({ node }: NodeRenderer2Props<Building>) {
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
