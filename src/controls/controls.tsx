import React, { ReactNode, useCallback, useRef } from "react";
import ReactDOM from "react-dom/client";
import { useInputSendingConnection } from "../useWebRtcThings";
import "../index.css";

function Controls() {
  const identifier = window.location.hash.slice(1);
  const sendInput = useInputSendingConnection(identifier);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0.75vh",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <DirectionButton direction="forward" sendInput={sendInput}>
          ⇧
        </DirectionButton>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "0.75vh" }}>
        <DirectionButton direction="left" sendInput={sendInput}>
          ⇦
        </DirectionButton>
        <DirectionButton direction="backward" sendInput={sendInput}>
          ⇩
        </DirectionButton>
        <DirectionButton direction="right" sendInput={sendInput}>
          ⇨
        </DirectionButton>
      </div>
    </div>
  );
}

function DirectionButton(props: {
  direction: string;
  sendInput(direction: string, active: boolean): void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onTouchStart = useCallback(() => {
    ref.current && (ref.current.style.scale = "1.04");
    props.sendInput(props.direction, true);
  }, [props.direction, props.sendInput]);

  const onTouchEnd = useCallback(() => {
    ref.current && (ref.current.style.scale = "1");
    props.sendInput(props.direction, false);
  }, [props.direction, props.sendInput]);
  return (
    <div
      ref={ref}
      style={{
        background: "#ffd903",
        color: "black",
        width: "15vh",
        height: "15vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "6vh",
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        borderRadius: "1vh",
        border: "0.5vh solid black",
        transition: "scale 150ms ease",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {props.children}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Controls />
  </React.StrictMode>
);
