<template>
  asdfasf
  <div id="container" style="width: 400px; height: 500px"></div>
  <g-canvas renderer="canvas" width="600" height="500">
    <g-circle :v-bind="circleStyle">
      <!-- <g-text fill="#fff" x="50px" y="20px">我是一段文字</g-text> -->
    </g-circle>
  </g-canvas>
</template>
<script setup lang="ts" vapor>
import { onMounted, createVaporApp, ref } from "vue/vapor";
import { Canvas } from "@antv/g-lite";
import { Renderer } from "@antv/g-canvas";
import "./g-web-components";
import "@antv/g-lite";
import "@antv/g-canvas";
import "./g-web-components";
import { useApi } from "./g-api";

const circleStyle = {
  r: 50,
  fill: "#1890FF",
  stroke: "#F04864",
  lineWidth: 4,
  cursor: "pointer",
  transform: "translate(100,100)",
};
useApi();
</script>

<style>
#container {
  height: 100%;
  width: 100%;
}
</style>
