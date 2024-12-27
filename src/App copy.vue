<template>
  asdfasf
  <div id="container"></div>
</template>
<script setup lang="ts" vapor>
import { onMounted } from "vue/vapor";

import { Canvas, CanvasEvent, Circle, Group } from "@antv/g";
import { Renderer } from "@antv/g-canvas";

// import node from './node.vue'
onMounted(async () => {
  // const graph =  createApp(node)

  const canvas = new Canvas({
    container: "container",
    width: 600,
    height: 500,
    renderer: new Renderer(),
  });
  const group = new Group({
    id: "gggg",
    style: {
      transform: "translate(200px, 100px)",
    },
  });

  const circle = new Circle({
    style: {
      r: 50,
      fill: "#1890FF",
      stroke: "#F04864",
      lineWidth: 4,
      cursor: "pointer",
    },
  });
  group.appendChild(circle);

  canvas.addEventListener(CanvasEvent.READY, () => {
    console.log("sdfsffffffffff");
    canvas.appendChild(group);
  });

  // graph.mount(canvas);
  // canvas.appendChild();
});
</script>

<style>
#container {
  height: 100%;
  width: 100%;
}
</style>
