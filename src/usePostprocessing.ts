import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  RenderPass,
  BokehPass,
  EffectComposer,
} from "three/examples/jsm/Addons.js";

export default function usePostprocessing() {
  const composerRef = useRef<EffectComposer>();
  useThree(({ camera, scene, gl }) => {
    const composer = new EffectComposer(gl);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Bokeh
    const bokehPass = new BokehPass(scene, camera, {
      focus: 3,
      aperture: 0.00035,
      maxblur: 0.0035,
    });
    bokehPass.renderToScreen = true;
    composer.addPass(bokehPass);
    composerRef.current = composer;
  });
  useFrame(({ gl }) => {
    gl.autoClear = false;
    composerRef.current?.render();
  }, 2);
}
