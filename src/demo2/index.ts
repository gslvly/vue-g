import { createApp } from "../custom-render";
import { Renderer } from "@antv/g-canvas";
import { Canvas } from "@antv/g";
import { canvasDrag, canvasZoom } from "./utils/canvas-transform";
import test from "./test.vue";
import { createMiniMap } from "./utils/mini-map";

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
  createApp(test).mount(canvas);

  window.gCanvas = canvas;
  return canvas;
};

export { createGApp };
