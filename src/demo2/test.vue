<template>
  <g-group
    id="ggg"
    ref="root"
    @mouseenter="show = true"
    @mouseleave="show = false"
    style="transform: translate(300, 300)"
  >
    <g-circle :style="{ fill: 'red', r: 10, zIndex: 1000 }"></g-circle>
    <flexBox :gap="1" direction="column">
      <g-circle :style="{ fill: 'blue', r: 100 }"></g-circle>
      <g-rect
        :style="{ width: 40, height: 20, fill: 'green', zIndex: 100 }"
      ></g-rect>
      <g-rect
        v-if="show"
        :style="{
          width: 40,
          height: 20,
          fill: 'green',
        }"
      ></g-rect>
      <g-text
        :style="{
          text: '什么是啥啊',
          fill: '#eee',
        }"
      ></g-text>
    </flexBox>
  </g-group>
</template>

<script lang="ts" setup>
import flexBox from "../demo/components/flex-box.vue";
const show = ref(false);
// setInterval(() => {
//   node.x = x + Math.random() * 800 * (Math.random() > 0.5 ? 1 : -1);
//   node.y = y + Math.random() * 800 * (Math.random() > 0.5 ? 1 : -1);
// });
// onMounted(() => {
// const group = root.value!;
// });
</script>

<style lang="scss"></style>
