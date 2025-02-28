import { Group, Rect, Text } from "@shopify/react-native-skia";

import { Room } from "@/constants/types";

import { font } from "./fonts";
import { NodeRendererProps } from "./Renderer";

export function RoomRenderer({ node: room }: NodeRendererProps<Room>) {
  const [x, y] = room.position;
  const [width, height] = room.size;

  const textSize = font.measureText(room.name);

  const color = room.subType === "classroom" ? "pink" : "violet";

  return (
    <Group key={room.name} blendMode="multiply">
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        color={color}
        style="fill"
      />
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        color="gray"
        style="stroke"
        strokeWidth={2}
      />
      <Text
        font={font}
        x={x + (width / 2 - textSize.width / 2)}
        y={y + (height / 2 + textSize.height / 2)}
        text={room.name}
      />
    </Group>
  );
}
