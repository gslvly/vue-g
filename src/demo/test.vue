<template>
  <normalEdge v-for="(it, i) in data.edges" :edge="it" :key="it.id">
  </normalEdge>
  <normalNode
    v-for="(it, i) in data.nodes"
    :key="it.id"
    :node="it"
  ></normalNode>
</template>

<script lang="ts" setup>
import { Circle, Group } from "@antv/g";
import normalNode from "./normal-node.vue";
import normalEdge from "./normal-edge.vue";
import obj from "../data.json";
import { createDataManager } from "./dataManager";

const manager = createDataManager(obj);
const data = manager.data;
data.nodes.forEach((it) => {
  it.size = (Math.random() * 20) | (0 + 20);
});
window.data = data;

const start = () => {
 
  requestAnimationFrame(start);
  data.nodes.forEach((it) => {
    it.x += (Math.random() > 0.5 ? 1 : -1) * Math.random() * 5;
    it.y += (Math.random() > 0.5 ? 1 : -1) * Math.random() * 5;
  });
};
start()
const node = manager.getNodeById(
  "BSC-0x3299b40c2a004dd8ceb06ce4a93dce3563368545"
)!;
// setInterval(() => {
//   node.x = x + Math.random() * 800 * (Math.random() > 0.5 ? 1 : -1);
//   node.y = y + Math.random() * 800 * (Math.random() > 0.5 ? 1 : -1);
// });
onMounted(() => {});
</script>

<style lang="scss"></style>
