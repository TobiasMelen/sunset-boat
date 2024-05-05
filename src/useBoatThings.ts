import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useCallback } from "react";
import { Group, MathUtils, Vector3 } from "three";

const momentumDecay = 1750;

const keys = Object.entries({
  forward: ["w", "arrowup"],
  backward: ["s", "arrowdown"],
  left: ["a", "arrowleft"],
  right: ["d", "arrowright"],
});
const calculateMomentum = (accelerating: boolean, time: number) => {
  const diff = accelerating
    ? performance.now() - time
    : time - performance.now() + momentumDecay;
  return MathUtils.clamp(diff, 0, momentumDecay) / momentumDecay;
};

export function useMoveControls(bodyRef: React.RefObject<Group>) {
  const movement = useRef({
    forward: [false, 0],
    backward: [false, 0],
    left: [false, 0],
    right: [false, 0],
  } as Record<string, [boolean, number]>);
  useFrame(() => {
    bodyRef.current?.rotateOnAxis(
      new Vector3(0, 1, 0),
      (calculateMomentum(...movement.current.left) -
        calculateMomentum(...movement.current.right)) *
        0.015
    );
    bodyRef.current?.translateOnAxis(
      new Vector3(0, 0, 1),
      (calculateMomentum(...movement.current.forward) -
        calculateMomentum(...movement.current.backward)) *
        0.05
    );
  });
  
  const addMomentum = useCallback((direction: string, activate: boolean) => {
    const previousMomentum =
      momentumDecay * calculateMomentum(false, movement.current[direction][1]);
    movement.current[direction] = [
      activate,
      performance.now() - previousMomentum,
    ];
  }, []);

  useEffect(() => {
    const handleKeyEvent = (pressDown: boolean) => (event: KeyboardEvent) => {
      const direction = keys.find(([, keys]) =>
        keys.includes(event.key.toLowerCase())
      )?.[0];
      if (!direction) {
        return;
      }
      event.preventDefault();
      if (event.repeat) {
        return;
      }
      addMomentum(direction, pressDown);
    };
    const onKeyPress = handleKeyEvent(true);
    const onKeyUp = handleKeyEvent(false);
    window.addEventListener("keydown", onKeyPress);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [addMomentum]);
  return addMomentum;
}

export function useSurfaceBobbing(ref: React.RefObject<Group>) {
  useFrame((state) => {
    if (!ref.current) {
      return;
    }
    const t = state.clock.getElapsedTime();
    ref.current.rotation.set(
      Math.cos(t * 1.5) / 70,
      Math.sin(t) / 70,
      Math.cos(t * 2) / 70
    );
    ref.current.position.y = Math.sin(t * 2) / 50 - 0.05;
  });
}
