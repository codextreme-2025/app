export type Coordinates = [number, number];
export type Size = [number, number];
export type Orientation = "vertical" | "horizontal";

export interface BaseNode {
  type: string;
  id: string;
  name?: string;
}

export interface Campus extends BaseNode {
  type: "campus";
  buildings: Building[];
}

export interface Building extends BaseNode {
  type: "building";
  offset?: Coordinates;
  floors: Floor[];
  elevators?: Elevator[];
  stairs?: Stair[];
}

export interface Floor extends BaseNode {
  type: "floor";
  level: number;
  offset?: Coordinates;
  spaces: Space[];
  walls?: Wall[];
  holes?: Hole[];
  path: Coordinates[];
}

export interface BaseSpace extends BaseNode {
  type: "space";
  name: string;
  spaceType?: "room" | "open";
  subType?:
    | "classroom"
    | "toilet"
    | "library"
    | "office"
    | "hallway"
    | "wellness";

  entrances?: PathNode[];
}

export interface RectSpace extends BaseSpace {
  position: Coordinates;
  size: Size;
}

export interface FreeSpace extends BaseSpace {
  path: Coordinates[];
}

export type Space = RectSpace | FreeSpace;

export interface Stair extends BaseNode {
  type: "stair";
  position: Coordinates;
  length: number;
  orientation?: Orientation;
  floors: number[];
}

export interface Elevator extends BaseNode {
  type: "elevator";
  position: Coordinates;
  width: number;
  floors: number[];
}

export interface Wall extends BaseNode {
  type: "wall";
  path: Coordinates[];
}

export interface Hole extends BaseNode {
  type: "hole";
  path: Coordinates[];
}

export interface PathNode extends BaseNode {
  type: "path";
  position: Coordinates[];
  connectedEdges: PathEdge[];
}

export interface PathEdge extends BaseNode {
  type: "edge";
  from: string;
  to: string;
  distance: number;
}

export interface NodeRendererProps<N extends BaseNode = BaseNode> {
  node: N;
}
