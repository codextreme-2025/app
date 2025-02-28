import { BaseNode, Building, Room } from "@/constants/types";

import { RoomRenderer } from "./Room";
import { BuildingRenderer } from "./Building";

export interface NodeRendererProps<N extends BaseNode = BaseNode> {
  node: N;
}

export function NodeRenderer({ node }: NodeRendererProps) {
  switch (node.type) {
    case "room":
      return <RoomRenderer node={node as Room} />;
    case "building":
      return <BuildingRenderer node={node as Building} />;
    default:
      return null;
  }
}
