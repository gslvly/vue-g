import { createApp } from "../custom-render";
import { Renderer } from "@antv/g-canvas";
import { Canvas } from "@antv/g";
import test from "./test.vue";
import { canvasDrag, canvasZoom } from "../demo/utils/canvas-transform";
import { createMiniMap } from "../demo/utils/mini-map";
import { createBrushSelect } from "../demo/utils/brush-select";

const createGApp = (dom: HTMLDivElement) => {
  const renderer = new Renderer({
    enableDirtyRectangleRenderingDebug: false,
    enableDirtyRectangleRendering: true,
  });

  // const plugin = new PluginYoga({});
  // console.log("ssss");

  // renderer.registerPlugin(plugin);
  // renderer.registerPlugin(new PluginDrag({}));
  const { width, height } = dom.getBoundingClientRect();
  const canvas = new Canvas({
    container: dom,
    width: width,
    height: height,
    renderer,
  });

  canvasDrag(canvas);
  canvasZoom(canvas);
  createMiniMap(canvas, dom);
  createBrushSelect(canvas)
  createApp(test).mount(canvas);

  window.gCanvas = canvas;
  return canvas;
};

export { createGApp };
