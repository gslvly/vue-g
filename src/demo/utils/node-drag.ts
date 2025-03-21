import { DisplayObject, FederatedMouseEvent, Group } from "@antv/g";
type IEl = DisplayObject & {
  _onMouseMove: (e: MouseEvent) => void;
  _onMouseup: (e: MouseEvent) => void;
};
export const vDragNode = {
  mounted: (
    node: IEl,
    binding: { arg?: string; value: (v: { x: number; y: number }) => void }
  ) => {
    let x = 0,
      y = 0,
      s = false,
      c = 1;
    const move = binding.value;
    const zIndex = node.parsedStyle.zIndex || 0;
    node.addEventListener("mousedown", (e: FederatedMouseEvent) => {
      c = node.ownerDocument?.defaultView?.getCamera().getZoom() || 1;
      node.style.zIndex = 1000000;
      e.stopPropagation();
      x = e.clientX;
      y = e.clientY;
      s = true;
    });
    node._onMouseMove = (() => {
      let w = false;
      let e: FederatedMouseEvent;
      return (v) => {
        if (!s) return;

        e = v;
        if (w) return;
        w = true;
        requestAnimationFrame(() => {
          move({ x: (e.x - x) / c, y: (e.y - y) / c });
          x = e.x;
          y = e.y;
          w = false;
        });
      };
    })();

    node._onMouseup = () => {
      if (!s) return;
      s = false;
      node.style.zIndex = zIndex;
    };

    document.addEventListener("mousemove", node._onMouseMove);

    document.addEventListener("mouseup", node._onMouseup);
  },
  unmounted(node: IEl) {
    document.removeEventListener("mousemove", node._onMouseMove);
    document.removeEventListener("mouseup", node._onMouseup);
  },
};
