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

// export const walls: Wall[] = [
//   {
//     type: "wall",
//     name: ""
//   }
// ]

export const allRooms = [
  ...classes,
  ...toilets,
  ...buildings,
  ...libraries,
  ...stairs,
];
