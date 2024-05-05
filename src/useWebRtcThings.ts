import { useCallback } from "react";
import { joinRoom } from "trystero/nostr";

type Direction = "forward" | "backward" | "left" | "right";

type InputActionData = {
  direction: Direction;
  activate: boolean;
};

export function useInputReceiverConnection(
  identifier: string | undefined,
  onInput: (direction: Direction, activate: boolean) => void
) {
  if (!identifier) {
    return;
  }
  const room = joinRoom({ appId: "sunset-boat" }, identifier);
  const [, receiver] = room.makeAction<InputActionData>("input");
  receiver((data) => onInput(data.direction, data.activate));
}

export function useInputSendingConnection(identifier: string) {
  const room = joinRoom({ appId: "sunset-boat" }, identifier);
  const [sender] = room.makeAction<InputActionData>("input");
  return useCallback(
    (direction: Direction, activate: boolean) =>
      sender({ direction, activate }),
    [sender]
  );
}
