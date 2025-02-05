import { Canvas, Circle } from "@antv/g";

export const canvasTransform = (canvas: Canvas) => {
  const root = canvas.getRoot();
  let x = 0,
    y = 0,
    s = false;

  canvas.addEventListener("mousedown", (e) => {
    x = e.clientX;
    y = e.clientY;
    s = true;
  });
  window.addEventListener("mousemove", (e) => {
    if (!s) return;
    root.translateLocal(e.x - x, e.y - y);
    x = e.x;
    y = e.y;
  });
  window.addEventListener("mouseup", () => {
    s = false;
  });
  
  canvas.addEventListener("wheel", (e) => {
    const s = e.deltaY >= 0 ? 0.9 : 1.1;
    const x = e.offsetX;
    const y = e.offsetY;
    const matrix = root.getLocalTransform();

    matrix[0] = matrix[5] = s * matrix[0];

    matrix[12] = x - x * s + matrix[12] * s; //这次的缩放补偿 + 上一次的移动距离*缩放
    matrix[13] = y - y * s + matrix[13] * s;
    // matrix[12] = x - (x - matrix[12]) * s;
    // matrix[13] = y - (y - matrix[13]) * s;

    root.setLocalTransform(matrix);
  });
};
