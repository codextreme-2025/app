import { BaseNode, Node } from "@/constants/types";

import { RoomRenderer } from "./Room";
import { BuildingRenderer } from "./Building";
import { StairRenderer } from "./Stair";
import { ReactNode } from "react";
import { WallRenderer } from "./Wall";

export interface NodeRendererProps<N extends BaseNode = Node> {
  node: N;
}

const renderers = new Map<
  Node["type"],
  (props: NodeRendererProps<any>) => ReactNode
>([
  ["room", RoomRenderer],
  ["building", BuildingRenderer],
  ["stair", StairRenderer],
  ["wall", WallRenderer],
]);

export function NodeRenderer({ node }: NodeRendererProps) {
  const Renderer = renderers.get(node.type);

  if (Renderer) {
    return <Renderer node={node} />;
  }

  return null;
}
