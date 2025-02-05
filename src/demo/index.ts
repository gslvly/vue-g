import { createApp } from "../custom-render";
import { Renderer } from "@antv/g-canvas";
import { Canvas } from "@antv/g";
import { canvasTransform } from "./utils/canvas-transform";
import test from './test.vue'

const createGApp = async (dom: HTMLDivElement) => {
  const renderer = new Renderer({
    enableDirtyRectangleRenderingDebug: false,
    enableDirtyRectangleRendering: true,
  });

  // const plugin = new PluginYoga({});
  // console.log("ssss");

  // renderer.registerPlugin(plugin);
  // renderer.registerPlugin(new PluginDrag({}));
  const canvas = new Canvas({
    container: dom,
    width: 1000,
    height: 1000,
    renderer,
  });
  await canvas.ready;
  const root = canvas.getRoot();

  createApp(test).mount(canvas);
  canvasTransform(canvas);

  return canvas;
};

export { createGApp };
