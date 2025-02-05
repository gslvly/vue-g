import { Group } from "@antv/g";

export const nodeDrag = (
  node: Group,
  move: (v: { x: number; y: number }) => void
) => {
  let x = 0,
    y = 0,
    s = false,
    c = 1;

  node.addEventListener("mousedown", (e) => {
    c = node.getScale()[0];
    node.style.zIndex = "100";
    e.stopPropagation();
    x = e.clientX;
    y = e.clientY;
    console.log({ x, y });
    s = true;
  });
  document.addEventListener("mousemove", (() => {
    let w = false;
    let e: MouseEvent
    return (v) => {
      if (!s) return;

      e = v;
      if (w) return;
      w = true;
      requestAnimationFrame(() => {
        move({ x: (e.x - x) / c, y: (e.y - y) / c });
        x = e.x;
        y = e.y;
        w = false
      });
    };
  })());

  document.addEventListener("mouseup", () => {
    if (!s) return;
    s = false;
    node.style.zIndex = 1;
  });
};
