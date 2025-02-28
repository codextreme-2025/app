import {
  Building,
  Hole,
  Orientation,
  Room,
  Stair,
  Wall,
} from "@/constants/types";

export const classes: Room[] = [
  {
    type: "room",
    name: "Benin",
    subType: "classroom",
    position: [0, 0],
    size: [100, 100],
  },
  {
    type: "room",
    name: "Eswatini",
    subType: "classroom",
    position: [500, 200],
    size: [100, 100],
  },
];

export const offices: Room[] = [
  {
    type: "room",
    name: "Office 1",
    position: [200, 50],
    subType: "office",
    size: [50, 50],
  },
  {
    type: "room",
    name: "Office 2",
    position: [250, 50],
    subType: "office",
    size: [50, 50],
  },
];

export const rooms: Room[] = [
  {
    type: "room",
    name: "Relaxation Room",
    position: [350, 100],
    size: [50, 33],
  },
  {
    type: "room",
    name: "Wellness Center",
    position: [350, 133],
    size: [50, 66],
  },
];

export const buildings: Building[] = [
  {
    type: "building",
    path: [
      [0, 0],
      [400, 0],
      [400, 200],
      [600, 200],
      [600, 300],
      [200, 300],
      [200, 100],
      [0, 100],
    ],
  },
];

export const stairs: Stair[] = [
  {
    type: "stair",
    name: "Stairs in front of Benin",
    position: [150, 0],
    size: [20, 80],
    orientation: Orientation.UP,
  },
  {
    type: "stair",
    name: "Stairs in Leadership Center",
    position: [280, 120],
    size: [20, 80],
  },

  {
    type: "stair",
    name: "Stairs in front of Eswatini",
    position: [400, 240],
    size: [20, 80],
    orientation: Orientation.RIGHT,
  },
];

export const walls: Wall[] = [
  {
    type: "wall",
    name: "Wall of Leadership Center",
    from: [300, 200],
    to: [320, 200],
  },
];

export const holes: Hole[] = [
  {
    type: "hole",
    name: "Hole near Eswatini",
    path: [
      [480, 200],
      [500, 200],
      [500, 300],
      [480, 300],
    ],
  },
];

export const toilets: Room[] = [
  {
    type: "room",
    subType: "toilet",
    name: "Toilets",
    position: [350, 0],
    size: [50, 100],
  },
];

export const allRooms = [
  ...classes,
  ...rooms,
  ...buildings,
  ...offices,
  ...toilets,
  ...stairs,
  ...walls,
  ...holes,
];
