<template>
  <g-group
    id="virtual-node"
    :style="{
      transform: `translate(${node.x}px,${node.y}px)`,
    }"
  >
    <g-rect
      :style="{
        fill: 'blue',
        width: 40,
        height: 40,
      }"
    >
      <g-text text="aaa"></g-text>
    </g-rect>

  </g-group>
</template>

<script lang="ts" setup name="normalNode">
defineProps<{
  node: INode;
}>();
</script>
