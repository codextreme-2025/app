import { Building, Room, Stair } from "./types";

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
    position: [0, 600],
    size: [100, 100],
  },
  {
    type: "room",
    name: "Liberia",
    subType: "classroom",
    position: [100, 600],
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
      [400, 600],
      [200, 600],
      [200, 700],
      [0, 700],
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
];

export const allRooms = [
  ...classes,
  ...toilets,
  ...buildings,
  ...libraries,
  ...stairs,
];
