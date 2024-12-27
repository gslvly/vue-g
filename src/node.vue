<template>
  <!-- <g-group id="ggg" :style="style"> -->
    <g-circle :style="circleStyle" />
  <!-- </g-group> -->
</template>

<script lang="ts" vapor>
import { reactive } from "vue/vapor";
import "@antv/g-web-components";
const style = reactive({
  transform: "translate(200px, 100px)",
});

const circleStyle = reactive({
  r: 50,
  fill: "#1890FF",
  stroke: "#F04864",
  lineWidth: 4,
  cursor: "pointer",
});
</script>
