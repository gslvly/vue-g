<template>
  <div id="dom" ref="dom"></div>
</template>
<script setup lang="ts">
import { DefineComponent, onMounted, PropType, ref } from "vue";
import { createGApp } from "./demo";
const dom = ref<HTMLDivElement>();

onMounted(() => {
  const graph = createGApp(dom.value!);
  onMounted(() => {
    console.log('xxxxxxxxxxxxxxx')
  })
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
