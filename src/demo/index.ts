import { createApp } from "../custom-render";
import { Renderer } from "@antv/g-canvas";
// import { Renderer } from '@antv/g-webgl';

import { Canvas } from "@antv/g";
import { canvasTransform } from "./utils/canvas-transform";
import test from "./test.vue";
import { createMiniMap } from "./utils/mini-map";
import { useDomResize } from "./utils/use";

const createGApp = async (dom: HTMLDivElement) => {
  const renderer = new Renderer({
    enableDirtyRectangleRenderingDebug: false,
    enableDirtyRectangleRendering: true,
  });

  // const plugin = new PluginYoga({});
  // console.log("ssss");

  // renderer.registerPlugin(plugin);
  // renderer.registerPlugin(new PluginDrag({}));
  useDomResize(
    () => dom,
    () => {
      const { width, height } = dom.getBoundingClientRect();
      canvas.resize(width, height);
    }
  );
  const { width, height } = dom.getBoundingClientRect();
  const canvas = new Canvas({
    container: dom,
    width: width,
    height: height,
    renderer,
  });

  await canvas.ready;

  const root = canvas.getRoot();

  createApp(test).mount(canvas);
  canvasTransform(canvas);
  createMiniMap(canvas, dom);
  window.cc = canvas;

  return canvas;
};

export { createGApp };
