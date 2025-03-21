import {
  Canvas,
  DisplayObject,
  ICanvas,
  FederatedMouseEvent,
  CanvasEvent,
} from "@antv/g";
type IPos = { x: number; y: number };

export const createBrushSelect = (
  canvas: Canvas,
  options?: Partial<{
    shouldBegin: (e: FederatedMouseEvent) => boolean;
    filter: (e: DisplayObject) => boolean;
  }>
) => {
  const shouldBegin = options?.shouldBegin || (() => true);
  const filter = options?.filter || (() => true);

  let start = null as null | { x: number; y: number };
  let dom: HTMLDivElement | null = null;
  const handler = [] as ((e: DisplayObject[]) => void)[];

  const getBox = (start: IPos, end: IPos) => {
    const minX = Math.min(start.x, end.x);
    const minY = Math.min(start.y, end.y);
    const maxX = Math.max(start.x, end.x);
    const maxY = Math.max(start.y, end.y);
    return { minX, minY, maxX, maxY };
  };

  canvas!.addEventListener("mousedown", (e: FederatedMouseEvent) => {
    if (!shouldBegin(e)) return;
    if (e.shiftKey) {
      start = { x: e.viewportX, y: e.viewportY };
      dom = document.createElement("div");
      dom.className = "brush-select";
      dom.style.cssText = "background:rgba(34, 86, 255, 0.1);position:fixed;";
      document.body.appendChild(dom);
    }
  });

  const mousemove = (e: MouseEvent) => {
    if (!dom || !start) return;
    if (!e.shiftKey) {
      start = null;
      dom.remove();
      return;
    }
    const { minX, minY, maxX, maxY } = getBox(canvas.viewport2Client(start), {
      x: e.clientX,
      y: e.clientY,
    });
    dom.style.left = `${minX}px`;
    dom.style.top = `${minY}px`;
    dom.style.width = `${maxX - minX}px`;
    dom.style.height = `${maxY - minY}px`;
  };

  const mouseup = (e: MouseEvent) => {
    if (!start) return;
    const end = canvas.client2Viewport({ x: e.clientX, y: e.clientY });
    const { minX, minY, maxX, maxY } = getBox(
      canvas.viewport2Canvas(start),
      canvas.viewport2Canvas(end)
    );
    const elements = canvas.document
      .elementsFromBBox(minX, minY, maxX, maxY)
      .filter(filter);
    console.log(elements)
    handler.forEach((fn) => fn(elements));
    dom?.remove();
  };

  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  canvas.addEventListener(CanvasEvent.BEFORE_DESTROY, () => {
    handler.length = 0;
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  });

  const onSelected = (fn: (elements: DisplayObject[]) => void) => {
    handler.push(fn);
  };

  return {
    onSelected,
  };
};
