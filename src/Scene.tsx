import { Environment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {
  MathUtils
} from "three";
import FishingBoat from "./FishingBoat";
import RotateScroller from "./RotateScroller";
import usePostprocessing from "./usePostprocessing";
import WaterPlane from "./WaterPlane";

export default function Scene() {
  useThree(({ camera }) => {
    camera.rotation.set(MathUtils.degToRad(-25), 0, 0);
  });
  usePostprocessing();
  
  return (
    <RotateScroller>
      <Environment
        background
        preset="dawn"
      ></Environment>
      <WaterPlane position={[0, -1, 0]} />
      <FishingBoat
        position={[5, 0, -5]}
        scale={1.5}
        rotation={[0, MathUtils.degToRad(-90), 0]}
      />
    </RotateScroller>
  );
}

