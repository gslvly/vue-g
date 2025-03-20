import { createApp } from "../custom-render";
import { Renderer } from "@antv/g-canvas";
// import { Renderer } from '@antv/g-webgl';

import { Canvas } from "@antv/g";
import { canvasDrag, canvasZoom } from "./utils/canvas-transform";
import test from "./test.vue";
import { createMiniMap } from "./utils/mini-map";
import { useDomResize } from "./utils/use";
import { createBrushSelect } from "./utils/brush-select";

const createGApp = async (dom: HTMLDivElement) => {
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

  return canvas;
};

export { createGApp };
