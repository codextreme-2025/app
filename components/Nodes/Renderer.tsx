import { BaseNode, Room } from "@/constants/types";

import { RoomRenderer } from "./Room";

export interface NodeRendererProps<N extends BaseNode = BaseNode> {
  node: N;
}

export function NodeRenderer({ node }: NodeRendererProps) {
  switch (node.type) {
    case "room":
      return <RoomRenderer node={node as Room} />;
    default:
      return null;
  }
}
