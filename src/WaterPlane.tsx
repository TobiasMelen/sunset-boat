import { MeshProps } from "@react-three/fiber";
import { useMemo } from "react";
import {
  VideoTexture,
  RepeatWrapping,
  MathUtils,
  ObjectSpaceNormalMap,
} from "three";
import x265Video from "./assets/water-x265.mp4";
import x264Video from "./assets/water-x264.mp4";

export default function WaterPlane(props: MeshProps) {
  const videoNormalMap = useMemo(() => {
    const video = document.createElement("video");
    const x265Source = document.createElement("source");
    x265Source.setAttribute("src", x265Video);
    x265Source.setAttribute("type", "video/mp4; codecs=avc1");
    video.appendChild(x265Source);
    const x264Source = document.createElement("source");
    x264Source.setAttribute("src", x264Video);
    x264Source.setAttribute("type", "video/mp4; codecs=hvc1");
    video.appendChild(x264Source);
    video.muted = true;
    video.loop = true;
    video.crossOrigin = "Anonymous";
    video.playbackRate = 1;
    video.play();
    const texture = new VideoTexture(video);
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.offset.set(-0.2, 0.7);
    texture.repeat.set(60, 60);

    return texture;
  }, []);
  return (
    <mesh {...props} rotation={[MathUtils.degToRad(-90), 0, 0]} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial
        normalMap={videoNormalMap}
        normalMapType={ObjectSpaceNormalMap}
        metalness={1}
        roughness={0}
      ></meshStandardMaterial>
    </mesh>
  );
}
