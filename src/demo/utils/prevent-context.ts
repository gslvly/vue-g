import type { Canvas } from "@antv/g";
/**菜单事件在元素上用rightup事件，必须要阻止默认菜单才生效*/
export const preventContextMenu = (gCanvas: Canvas) => {
  const canvas = gCanvas.getContextService().getDomElement();
  canvas?.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
};
