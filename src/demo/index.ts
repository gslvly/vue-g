import { createApp } from "../custom-render";
import { Renderer } from "@antv/g-canvas";

import { Canvas } from "@antv/g";
import { canvasDrag, canvasZoom } from "./utils/canvas-transform";
import test from "./test.vue";
import { createMiniMap } from "./utils/mini-map";
import { createBrushSelect } from "./utils/brush-select";
import { preventContextMenu } from "./utils/prevent-context";
const createGApp =  (dom: HTMLDivElement) => {
  const renderer = new Renderer();

  // renderer.registerPlugin(new PluginDrag({}));
  const { width, height } = dom.getBoundingClientRect();
 
  const canvas = new Canvas({
    container: dom,
    width: width,
    height: height,
    renderer,
  });
  // if(import.meta.hot) {
  //   import.meta.hot.data.canvas?.destroy()
  //   import.meta.hot.data.canvas = canvas
  // }
  

  canvasDrag(canvas);
  canvasZoom(canvas);
  createMiniMap(canvas, dom);
  preventContextMenu(canvas)
  
  const brushSelect = createBrushSelect(canvas, {
    filter: (v) => v.hasAttribute("brush-select"),
  });
  // brushSelect.onSelected((v) => {});
  createApp(test).mount(canvas);
  window.g = canvas;

  
  return canvas;
};

export { createGApp };
