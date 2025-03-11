import { Canvas, CanvasEvent, RenderReason } from "@antv/g";
import { Renderer } from "@antv/g-canvas";
import { debounce, last } from "lodash-es";

/**需要从外部updateCanvas小地图 */
export const createMiniMap = (
  gCanvas: Canvas,
  dom: HTMLDivElement,
  opt = { width: 220, height: 120 }
) => {
  const minimap = document.createElement("div");
  minimap.className = "mini-map";
  minimap.style.cssText = `width:${opt.width}px;height:${opt.height}px;background:#fff;position:relative;overflow:hidden;user-select:none`;
  dom.appendChild(minimap);
  const image = new Image();
  minimap.appendChild(image);
  image.width = opt.width;
  image.height = opt.height;

  const contextServer = gCanvas.getContextService();
  const renderContext = gCanvas.getRenderingContext();

  const rect = document.createElement("div");
  rect.style.border = "1px solid red";
  rect.style.position = "absolute";
  minimap.appendChild(rect);

  let scaleRatio = 1;
  let bBox = { x: 0, y: 0, width: 0, height: 0 };

  const genImage = debounce(() => {
    const g = gCanvas.getRoot().cloneNode(true);
    bBox = g.getBBox();
    const minimapCanvas = new Canvas({
      container: minimap,
      width: opt.width,
      height: opt.height,
      renderer: new Renderer(),
    });
    // 根据小图长宽计算缩放
    scaleRatio = Math.min(
      opt.width / Math.max(bBox.width, 1),
      opt.height / Math.max(bBox.height, 1)
    );
    minimapCanvas.appendChild(g);
    const camera = minimapCanvas.getCamera();
    camera.setPosition(bBox.width / 2 + bBox.x, bBox.height / 2 + bBox.y, 500);
    camera.setZoom(scaleRatio);
    minimapCanvas.render();
    minimapCanvas
      .getContextService()
      .toDataURL({ encoderOptions: 1, type: "image/png" })
      .then((res) => {
        image.src = res;
      });
    minimapCanvas.destroy(true);
    genRect();
  }, 500);

  const genRect = () => {
    const nativeCanvas = contextServer.getDomElement();
    if (!nativeCanvas) return;

    const a = gCanvas.viewport2Canvas({ x: 0, y: 0 });
    const b = gCanvas.viewport2Canvas({
      x: nativeCanvas.width,
      y: nativeCanvas.height,
    });

    // 大图中心点
    const cx = bBox.width / 2 + bBox.x;
    const cy = bBox.height / 2 + bBox.y;
    // 可视区域距离中心点位置
    const lcx = (a.x - cx) * scaleRatio;
    const lcy = (a.y - cy) * scaleRatio;

    rect.style.width = (b.x - a.x) * scaleRatio + "px";
    rect.style.height = (b.y - a.y) * scaleRatio + "px";
    rect.style.left = opt.width / 2 + lcx + "px";
    rect.style.top = opt.height / 2 + lcy + "px";
  };

  genImage();

  // 优化拖拽交互
  let isDragging = false;
  let lastPos = { x: 0, y: 0 };
  let maxLeft = 0;
  let maxTop = 0;
  rect.addEventListener("mousedown", (e) => {
    isDragging = true;
    lastPos = { x: e.clientX, y: e.clientY };
    maxLeft = opt.width - rect.offsetWidth;
    maxTop = opt.height - rect.offsetHeight;
  });

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    let dx = e.clientX - lastPos.x;
    let dy = e.clientY - lastPos.y;
    // 4周距离
    let right = maxLeft - rect.offsetLeft;
    let left = rect.offsetLeft;
    let top = rect.offsetTop;
    let bottom = maxTop - rect.offsetTop;
    // 大图拖动后，小图显示的rect一部分可能在外面
    if (dx > 0) {
      // 往右
      dx = Math.max(0, Math.min(right, dx));
    } else {
      // 往左
      dx = Math.min(Math.max(-left, dx), 0);
    }

    if (dy > 0) {
      dy = Math.max(0, Math.min(bottom, dy));
    } else {
      dy = Math.min(Math.max(-top, dy), 0);
    }

    lastPos.x += dx;
    lastPos.y += dy;
    gCanvas.getCamera().pan(dx / scaleRatio, dy / scaleRatio);
  };

  const onMouseUp = () => {
    isDragging = false;
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);

  gCanvas.getRenderingService().hooks.endFrame.tap("", () => {
    // console.log("anter");
    if (renderContext.renderReasons.has(RenderReason.DISPLAY_OBJECT_CHANGED)) {
      genImage();
    }
    if (renderContext.renderReasons.has(RenderReason.CAMERA_CHANGED)) {
      genRect();
    }
    if (renderContext.renderReasons.has(RenderReason.NONE)) {
      genImage();
    }
  });

  return {
    destroy: () => {
      minimap.remove();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    },
  };
};
