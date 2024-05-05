import { animated, config, useSpring } from "@react-spring/three";
import { Html } from "@react-three/drei";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Qr } from "./Qr";
import { useInputReceiverConnection } from "./useWebRtcThings";

export default function ClickForQrCode({
  onInput,
  children,
}: PropsWithChildren<{ onInput(direction: string, activate: boolean): void }>) {
  const [hover, setHover] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const isBig = hover && !showQr;
  usePointerCursor(isBig);

  const hoverProps = useSpring({
    scale: isBig ? 1.1 : 1,
    position: (isBig ? [0, 0.075, 0] : [0, 0, 0]) as [number, number, number],
    config: config.wobbly,
  } as const);

  const windowId = useMemo(() => {
    const existing = window.location.hash.substring(1);
    if (existing) {
      return existing;
    }
    if (showQr) {
      const windowId = (Math.random() + 1).toString(36).substring(7);
      window.location.hash = windowId;
      return windowId;
    }
  }, [showQr]);

  const handleInput = useCallback(
    (direction: string, active: boolean) => {
      setShowQr(false);
      onInput(direction, active);
    },
    [onInput]
  );

  useInputReceiverConnection(windowId, handleInput);

  return (
    <animated.group
      onClick={() => setShowQr((old) => !old)}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      {...hoverProps}
    >
      {children}

      <Html wrapperClass="fixed-important" center position={[0, -2, 0]}>
        <div
          style={{
            height: "15vh",
            width: "15vh",
            border: "0.75vh solid black",
            background: "white",
            borderRadius: "1vh",
            position: "relative",
            padding: "1vh",
            opacity: showQr ? 1 : 0,
            translate: showQr ? "0 0" : "0 33%",
            transitionProperty: "opacity translate",
            transitionDuration: "220ms",
            transitionTimingFunction: "ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              border: "2vh solid transparent",
              borderBottomColor: "black",
              transform: "translate(-50%, -100%)",
              top: 0,
            }}
          />
          <Qr
            value={
              windowId
                ? encodeURI(
                    `${window.location.href.replace(
                      window.location.hash,
                      ""
                    )}controls/#${windowId}`
                  )
                : ""
            }
          />
        </div>
      </Html>
    </animated.group>
  );
}

function usePointerCursor(enabled: boolean) {
  useEffect(() => {
    const original = window.document.body.style.cursor;
    if (enabled) {
      window.document.body.style.cursor = "pointer";
    }
    return () => {
      window.document.body.style.cursor = original;
    };
  }, [enabled]);
}
