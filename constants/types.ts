export interface BaseNode {
  type: string;
  name?: string;
  path?: [number, number][];
}

export interface Building extends BaseNode {
  type: "building";
}

export interface Room extends BaseNode {
  type: "room";
  name: string;
  subType?: "classroom" | "toilet" | "library";
  position: [number, number];
  size: [number, number];
}

export interface Stair extends BaseNode {
  type: "stair";
  name: string;
  position: [number, number];
  size: [number, number];
}

export type Node = Room | Building | Stair;
