<template>
  <div id="dom" ref="dom" style="width: 1000px; height: 1000px"></div>
  <!-- <test></test>   -->
</template>
<script setup lang="ts">
import { DefineComponent, onMounted, PropType, ref } from "vue";
import { createGApp } from "./demo";
const dom = ref<HTMLDivElement>();

onMounted(() => {
  createGApp(dom.value!);
});
</script>

<style>
#container {
  height: 100%;
  width: 100%;
}
canvas {
  background-color: azure;
}
</style>
