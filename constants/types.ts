export interface BaseNode {
  type: string;
  name?: string;
}

export interface Building extends BaseNode {
  type: "building";
}

export interface Room extends BaseNode {
  type: "room";
  name: string;
  subType?: "classroom" | "toilet";
  position: [number, number];
  size: [number, number];
}

export type Node = Room | Building;
