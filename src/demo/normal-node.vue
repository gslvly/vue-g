<template>
  <g-group
    @pointerover="hovered = true"
    @pointerout="hovered = false"
    ref="g"
    :id="node.id"
    :style="{
      transform: `translate(${node.x},${node.y})`,
      height: cfg.size,
    }"
    @click="click"
  >
    <g-circle
      style="fill: red; stroke: #f04864"
      :style="{
        r: cfg.size,
      }"
    ></g-circle>
    <g-image
      id="image"
      :style="{
        width: cfg.size * 1.8,
        height: cfg.size * 1.8,
        transform: `translate(${-cfg.size * 0.9},${-cfg.size * 0.9})`,
        src: cfg.image,
      }"
      v-if="cfg.image"
    ></g-image>

    <g-text v-else :text="cfg.label"></g-text>

    <g-image
      id="icon"
      v-for="it in cfg.iconCont"
      :key="`icon-${it}`"
      :style="{
        width: 24,
        height: 24,
        src: cfg.icon,
        transform: `translate(${it * 26 - (cfg.iconCont * 26) / 2},${
          cfg.size * 0.3
        })`,
      }"
    ></g-image>
    <g-dom to="#dom">
      <div>{{ n }}</div>
    </g-dom>
  </g-group>
</template>

<script lang="ts" setup name="normalNode">
import { ref, computed } from "vue";
import gDom from "../custom-render/g-dom";
import { Group } from "@antv/g";

import { nodeDrag } from "./utils/node-drag";
import icon from "./icons/icon-browser-LANTCH.svg?url";
import { INode } from "../type";

const props = defineProps<{
  node: INode;
}>();
let n = ref(0);

const click = () => {
  console.log(props.node);
};

const cfg = computed(() => {
  const node = props.node;
  const iconCont = (Math.random() * 5) | 0;
  return {
    iconCont,
    size: node.size,

    color: "#" + Math.random().toString(16).substring(2, 8),
    icon: icon,
    iconInvest:
      "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    label: (node.tagLabel || "") + (node.secondLevelTagTypeLabel || ""),
    subLabel: name,
    ens: node.ens,
    topLabel: "100/20",
    isDiamond: node.isVirtualNode,
    // tagMsg: node.note,
    tag: !node.isVirtualNode && node.sysTag,
    count: node.isGroup || node.isSmartGroup ? node.children.length : 0,
    countInvert: node.isSmartGroup,
    // countCache: node.isVirtualNode && !showVip && node.cacheEdges && node.cacheEdges.length,
    image: "/tag-image/" + node.imageName,
  };
});

const g = shallowRef<Group>();

onMounted(() => {
  const group = g.value!;
  nodeDrag(group, (v) => {
    props.node.x += v.x;
    props.node.y += v.y;
  });
});

const hovered = ref(false);
</script>

<style>
.systag {
  color: red;
  background-color: #fff;
  border: 1px solid red;
}
</style>
