import { BaseNode, Node } from "@/constants/types";

import { RoomRenderer } from "./Room";
import { BuildingRenderer } from "./Building";
import { StairRenderer } from "./Stair";

export interface NodeRendererProps<N extends BaseNode = Node> {
  node: N;
}

export function NodeRenderer({ node }: NodeRendererProps) {
  switch (node.type) {
    case "room":
      return <RoomRenderer node={node} />;
    case "building":
      return <BuildingRenderer node={node} />;
    case "stair":
      return <StairRenderer node={node} />;
    default:
      return null;
  }
}
