import { Building, Orientation, Room, Stair, Wall } from "./types";

export const classes: Room[] = [
  {
    type: "room",
    name: "Guinea",
    subType: "classroom",
    position: [0, 100],
    size: [100, 100],
  },
  {
    type: "room",
    name: "Mozambique",
    subType: "classroom",
    position: [200, 0],
    size: [100, 100],
  },
  {
    type: "room",
    name: "Malawi",
    subType: "classroom",
    position: [300, 0],
    size: [100, 100],
  },
  {
    type: "room",
    name: "Gambia",
    subType: "classroom",
    position: [0, 500],
    size: [100, 100],
  },
  {
    type: "room",
    name: "Liberia",
    subType: "classroom",
    position: [100, 500],
    size: [100, 100],
  },
];

export const toilets: Room[] = [
  {
    type: "room",
    name: "Toilets",
    subType: "toilet",
    position: [80, 200],
    size: [140, 50],
  },
];

export const buildings: Building[] = [
  {
    type: "building",
    path: [
      [0, 100],
      [100, 100],
      [100, 200],
      [200, 200],
      [200, 100],
      [200, 0],
      [400, 0],
      [400, 400],
      [200, 400],
      [200, 600],
      [0, 600],
    ],
  },
];

export const libraries: Room[] = [
  {
    type: "room",
    subType: "library",
    name: "Resource Center",
    position: [0, 300],
    size: [100, 100],
  },
];

export const stairs: Stair[] = [
  {
    type: "stair",
    name: "Stairs in front of Malawi",
    position: [340, 120],
    size: [20, 80],
  },
  {
    type: "stair",
    name: "Stairs to reception",
    position: [100, 320],
    size: [20, 80],
    orientation: Orientation.RIGHT,
  },

  {
    type: "stair",
    name: "Stairs to Benin",
    position: [100, 440],
    size: [20, 80],
    orientation: Orientation.LEFT,
  },
];

export const walls: Wall[] = [
  {
    type: "wall",
    name: "Wall in front of Liberia",
    from: [200, 400],
    via: [
      [120, 400],
      [100, 420],
      [120, 400],
    ],
    to: [100, 420],
  },
  {
    type: "wall",
    name: "Wall that separates leadership center",
    from: [340, 120],
    via: [
      [340, 300],
      [180, 300],
    ],
    to: [180, 320],
  },
  {
    type: "wall",
    name: "Wall in front of Mozambique",
    from: [250, 200],
    to: [340, 200],
  },
];

export const allRooms = [
  ...classes,
  ...toilets,
  ...buildings,
  ...libraries,
  ...stairs,
  ...walls,
];
