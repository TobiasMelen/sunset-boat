import { useEffect, useMemo, useRef } from "react";
import generateQr from "qr.js";

export function Qr({ value }: { value: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modules = useMemo(
    () => (value ? generateQr(value, { errorCorrectLevel: 1 }).modules : [[]]),
    [value]
  );
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }
    const size = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 2;
    canvas.height = size;
    canvas.width = size;
    const cellSize = size / modules.length;
    context.fillStyle = "black";
    context.lineWidth = 0;
    modules.forEach((row, rowIndex) => {
      row.forEach((enabled, columnIndex) => {
        if (!enabled) {
          return;
        }
        context.rect(
          cellSize * columnIndex,
          cellSize * rowIndex,
          cellSize,
          cellSize
        );
      });
    });
    context.fill();
    return () => {
      context.clearRect(0, 0, size, size);
    };
  }, [modules]);
  return (
    <canvas
      style={{ height: "100%", width: "100%", aspectRatio: 1 }}
      ref={canvasRef}
    />
  );
}
