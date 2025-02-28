import React, { ReactNode } from "react";
import { View } from "react-native";
import { Canvas, Group } from "@shopify/react-native-skia";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";

export interface SkiaPanningZoomingProps {
  width: number;
  height: number;
  children: ReactNode;
}

export const SkiaPanningZooming = ({
  width,
  height,
  children,
}: SkiaPanningZoomingProps) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleStart = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      scaleStart.value = scale.value;
    })
    .onChange((event) => {
      scale.value = scaleStart.value * event.scale;
    });

  const transform = useDerivedValue(() => [
    { translateX: translateX.value },
    { translateY: translateY.value },
    { scale: scale.value },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <GestureDetector gesture={Gesture.Simultaneous(panGesture, pinchGesture)}>
        <Canvas style={{ flex: 1, width, height }}>
          <Group
            transform={transform}
          >
            {children}
          </Group>
        </Canvas>
      </GestureDetector>
    </View>
  );
};
