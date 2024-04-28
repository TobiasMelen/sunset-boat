import { ScrollControls, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { PropsWithChildren } from "react";
import { MathUtils } from "three";

const circleInRadians = MathUtils.degToRad(360);

export default function RotateScroller(props: PropsWithChildren<{}>) {
  return (
    <ScrollControls infinite pages={10}>
      <ScrollListener />
      {props.children}
    </ScrollControls>
  );
}

const ScrollListener = () => {
  const scroll = useScroll();
  useFrame(({ scene }) => {
    scene.backgroundRotation.y = -(circleInRadians * scroll.offset);
    scene.environmentRotation.y = -(circleInRadians * scroll.offset);
  });
  return null;
};
