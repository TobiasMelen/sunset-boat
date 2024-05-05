import {
  CubeCamera
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { MathUtils } from "three";
import FishingBoat from "./FishingBoat";
import ScrollableEnvironment from "./ScrollableEnvironment";
import WaterPlane from "./WaterPlane";
import usePostprocessing from "./usePostprocessing";

export default function Scene() {
  useThree(({ camera }) => {
    camera.rotation.set(MathUtils.degToRad(-25), 0, 0);
  });
  usePostprocessing();
  return (
    <ScrollableEnvironment>
      <FishingBoat
        position={[7, 0, -7]}
        scale={1.5}
        rotation={[0, MathUtils.degToRad(-90), 0]}
      />
      <CubeCamera resolution={150} position={[0, -2.2, 5]}>
        {(texture) => (
          <WaterPlane position={[0, 1.2, 0]} mirrorTexture={texture} />
        )}
      </CubeCamera>
    </ScrollableEnvironment>
  );
}
