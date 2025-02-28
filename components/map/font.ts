import { matchFont } from "@shopify/react-native-skia";
import { Platform } from "react-native";

const fontFamily = Platform.select({ ios: "Helvetica", default: "sans-serif" });
const fontStyle = {
  fontFamily,
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: "normal",
} as const;
export const font = matchFont(fontStyle);
