<template>
  {{ ifs }}
  <div id="dom" ref="dom"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { createGApp } from "./demo";
import { Canvas } from "@antv/g";
const dom = ref<HTMLDivElement>();
const ifs = ref(0);
let last = performance.now();
let n = 0;
const start = () => {
  n++;
  if (n >= 30) {
    const now = performance.now();
    ifs.value = (n * 1000) / (now - last);
    n = 0;
    last = now;
  }
  requestAnimationFrame(() => {
    start();
  });
};
start();
let canvas: Canvas;
onMounted(() => {
  canvas = createGApp(dom.value!);
  onBeforeUnmount(() => {
    console.log("destroy");
    canvas.destroy();
  });
});
</script>

<style lang="scss">
#dom {
  position: relative;
  width: 100%;
  height: calc(100% - 80px);
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
  .mini-map {
    position: absolute !important;
    right: 24px;
    bottom: 100px;
  }
}

canvas {
  background-color: azure;
}
.mini-map {
  canvas {
    background-color: #fff;
  }
}
</style>
