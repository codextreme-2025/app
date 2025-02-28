import { Path, Skia } from "@shopify/react-native-skia";

export interface PathRendererProps {
  path: [number, number][];
  closePath?: boolean;
  style?: "stroke" | "fill";
  color?: string;
}

export function PathRenderer({
  path,
  closePath,
  style = "stroke",
  color = "black"
}: PathRendererProps) {
  const skiaPath = Skia.Path.Make();

  if (path) {
    path.forEach(([x, y], i) => {
      if (i === 0) {
        skiaPath.moveTo(x, y);
      } else {
        skiaPath.lineTo(x, y);
      }
    });
  }

  if (closePath) {
    skiaPath.close();
  }

  return (
    <Path
      path={skiaPath}
      color={color}
      style={style}
      strokeWidth={3}
    />
  );
}
