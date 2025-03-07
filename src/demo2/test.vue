<template>
  <g-group id="ggg" ref="root" style="transform: translate(300, 300)">
    
    <flexBox :gap="1" style="transform: translateX(10);">
      <g-circle
        :style="{ fill: 'blue', r: 100 + Math.random() * 5 }"
      ></g-circle>
      <g-rect :style="{ width: 40, height: 20, fill: 'green' ,zIndex:100}"></g-rect>
      <!-- <g-rect
        v-if="show"
        :style="{
          width: 40,
          height: 20,
          fill: 'green',
          transform: `translate(50,50)`,
        }"
      ></g-rect> -->
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
import flexBox from "./components/flex-box.vue";
import { translate } from "./utils/math";
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
