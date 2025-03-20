import { Canvas, DisplayObject, ICanvas } from "@antv/g";

export const createBrushSelect = (canvas: Canvas) => {
  let start = null as null | { x: number; y: number };
  let dom: HTMLDivElement | null = null;
  let data = null as DisplayObject[] | null;
  const server = canvas.getRenderingContext();

  canvas!.addEventListener("mousedown", (e: MouseEvent) => {
    if (e.shiftKey) {
      start = { x: e.canvasX, y: e.canvasY };
      dom = document.createElement("div");
      dom.className = "brush-select";
      dom.style.cssText = "background:red;border: 1px solid blue;";
      data = [];
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    console.log("move");
    if (!e.shiftKey) {
      start = null;
      dom = null;
      data = null;
      return;
    }
  });
  canvas.addEventListener("mouseup", (e) => {});
};
