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
  subType?: "classroom" | "toilet" | "library" | "office";
  position: [number, number];
  size: [number, number];
}

export enum Orientation {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export interface Stair extends BaseNode {
  type: "stair";
  name: string;
  orientation?: Orientation;
  position: [number, number];
  size: [number, number];
}

export interface Wall extends BaseNode {
  type: "wall";
  name: string;
  from: [number, number];
  to: [number, number];
  via?: [number, number][];
}

export interface Hole extends BaseNode {
  type: "hole";
  name: string;
  path: [number, number][];
}

export type Node = Room | Building | Stair | Wall | Wall | Hole;
