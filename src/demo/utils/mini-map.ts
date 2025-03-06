import { MutationObserver, type Canvas } from "@antv/g";

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

  const rect = document.createElement("div");
  rect.style.border = "1px solid red";
  rect.style.position = "absolute";
  minimap.appendChild(rect);

  let scaleRatio = 1;
  let bBox = { x: 0, y: 0, width: 0, height: 0 };

  //**什么时候生成新图片 */
  const genImage = () => {
    const ctxServer = gCanvas.getContextService();
    const nativeCanvas = ctxServer.getDomElement();
    if (!nativeCanvas) return;

    const camera = gCanvas.getCamera();
    // 保存原始数据
    const zoom = camera.getZoom();
    const position = camera.getPosition();
    const { width, height } = nativeCanvas;

    bBox = gCanvas.getRoot().getBBox();

    // 根据小图长宽计算缩放
    scaleRatio = Math.min(
      opt.width / Math.max(bBox.width, 1),
      opt.height / Math.max(bBox.height, 1)
    );

    gCanvas.resize(opt.width, opt.height);

    // 将大图换成小地图长宽比的窗口
    camera.setPosition(bBox.width / 2 + bBox.x, bBox.height / 2 + bBox.y, 500);
    camera.setZoom(scaleRatio);

    gCanvas.render();
    // 大图导出图片
    ctxServer
      .toDataURL({ encoderOptions: 1, type: "image/png" })
      .then((res) => {
        image.src = res;
      });

    gCanvas.resize(width, height);
    camera.setZoom(zoom);
    camera.setPosition(position);
  };

  const genRect = () => {
    const ctxServer = gCanvas.getContextService();
    const nativeCanvas = ctxServer.getDomElement();
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

  setInterval(() => {
    genRect();
  });

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

  const updateCanvas = () => {
    genImage();
  };

  const observer = new MutationObserver(() => {
    console.log("update", "xxx");
  });
  observer.observe(gCanvas.getRoot(), {
    childList: true,
    subtree: true,
    attributes: true,
  });

  return {
    updateCanvas,
    destroy: () => {
      observer.disconnect();
      minimap.remove();
    },
  };
};
