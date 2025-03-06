import { Canvas, Circle } from "@antv/g";
window.circle = Circle;
export const canvasTransform = (canvas: Canvas) => {
  const root = canvas.getRoot();
  const camera = canvas.getCamera();

  let x = 0,
    y = 0,
    s = false;
  window.g;

  canvas.addEventListener("mousedown", (e) => {
    x = e.clientX;
    y = e.clientY;
    console.log({
      client: [e.clientX, e.clientY], // 相当于页面
      page: [e.pageX, e.pageY], // 相当于页面
      screen: [e.screenX, e.screenY], // 相当于屏幕
      canvas: [e.canvasX, e.canvasY],
      viewPoint: [e.viewportX, e.viewportY], // canvas 左上角为原点：（0，0）
      target: e.target,
    });

    s = true;
  });
  window.addEventListener("mousemove", (e) => {
    if (!s) return;
    const v = camera.getZoom();
    camera.pan((x - e.x) / v, (y - e.y) / v);
    x = e.x;
    y = e.y;
  });
  window.addEventListener("mouseup", () => {
    s = false;
  });

  canvas.addEventListener("wheel", (e) => {
    const s = e.deltaY >= 0 ? 0.9 : 1.1;

    const { x, y } = canvas.client2Viewport({ x: e.clientX, y: e.clientY });
    // console.log(x, y);
    camera.setZoomByViewportPoint(camera.getZoom() * s, [x, y]);
    return;
    // const x = e.offsetX;
    // const y = e.offsetY;
    // const matrix = root.getLocalTransform();

    // matrix[0] = matrix[5] = s * matrix[0];

    // matrix[12] = x - x * s + matrix[12] * s; //这次的缩放补偿 + 上一次的移动距离*缩放
    // matrix[13] = y - y * s + matrix[13] * s;

    // root.setLocalTransform(matrix);
  });
};
