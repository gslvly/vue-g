import { CanvasEvent, type Canvas} from "@antv/g";
export const canvasZoom = (
  canvas: Canvas,
  { min, max } = { min: 0.01, max: 10 }
) => {
  const camera = canvas.getCamera();
  const zoom = ref(1);
  canvas.addEventListener("wheel", (e) => {
    zoom.value *= e.deltaY >= 0 ? 0.9 : 1.1;
    if (zoom.value < min) {
      zoom.value = min;
    }
    if (zoom.value > max) {
      zoom.value = max;
    }
    const { x, y } = canvas.client2Viewport({ x: e.clientX, y: e.clientY });
    camera.setZoomByViewportPoint(zoom.value, [x, y]);

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

export const canvasDrag = (gCanvas: Canvas) => {
  const camera = gCanvas.getCamera();

  let x = 0,
    y = 0,
    s = false;

  gCanvas.addEventListener("mousedown", (e: MouseEvent) => {
    x = e.clientX;
    y = e.clientY;
    s = true;
    // console.log({
    //   client: [e.clientX, e.clientY], // 相当于页面
    //   page: [e.pageX, e.pageY], // 相当于页面
    //   screen: [e.screenX, e.screenY], // 相当于屏幕
    //   canvas: [e.canvasX, e.canvasY], // 世界坐标，不受相机影响
    //   viewPoint: [e.viewportX, e.viewportY], // canvas 左上角为原点：（0，0）
    //   target: e.target,
    // });

  });


  const move = (e: MouseEvent) => {
    if (!s) return;

    const v = camera.getZoom();
    camera.pan((x - e.x) / v, (y - e.y) / v);
    x = e.x;
    y = e.y;
  };
  const mouseup = () => {
    s = false;
  };

  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", mouseup);
  gCanvas.addEventListener(CanvasEvent.BEFORE_DESTROY, () => {
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', mouseup)
  });
};
