import { Canvas, CanvasEvent, RenderReason } from "@antv/g";
import { Renderer } from "@antv/g-canvas";
import { debounce } from "lodash-es";

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
    genRect()
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

  rect.addEventListener("mousedown", (e) => {
    isDragging = true;
    lastPos = { x: e.clientX, y: e.clientY };
  });

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const dx = (e.clientX - lastPos.x) / scaleRatio;
    const dy = (e.clientY - lastPos.y) / scaleRatio;

    gCanvas.getCamera().pan(dx, dy);
    lastPos = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    isDragging = false;
  };

  minimap.addEventListener("mousemove", onMouseMove);
  minimap.addEventListener("mouseup", onMouseUp);
  minimap.addEventListener("mouseleave", onMouseUp);

  // 点击小图快速定位
  minimap.addEventListener("click", (e) => {
    const v = rect.getBoundingClientRect();

    const x = (e.clientX - v.left - v.width / 2) / scaleRatio;
    const y = (e.clientY - v.top - v.height / 2) / scaleRatio;

    gCanvas.getCamera().pan(x, y);
  });


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
    },
  };
};
