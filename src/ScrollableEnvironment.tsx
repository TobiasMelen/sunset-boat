import { Environment, ScrollControls, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { PropsWithChildren } from "react";
import { MathUtils } from "three";

const circleInRadians = MathUtils.degToRad(360);
const initialScroll = MathUtils.degToRad(75);

export default function ScrollableEnvironment(props: PropsWithChildren<{}>) {
  return (
    <ScrollControls infinite pages={10}>
      <Environment background preset="sunset" />
      <ScrollListener />
      {props.children}
    </ScrollControls>
  );
}

const ScrollListener = () => {
  const scroll = useScroll();
  useFrame(({ scene }) => {
    scene.backgroundRotation.y =
      initialScroll + circleInRadians * scroll.offset;
    scene.environmentRotation.y =
      initialScroll + circleInRadians * scroll.offset;
  });
  return null;
};
