<template>
  <g-group ref="group">
    <slot></slot>
  </g-group>
</template>

<script lang="ts" setup>
import { type Group } from "@antv/g";
import { sumBy } from "lodash-es";

defineOptions({ name: "g-flexbox" });
const props = defineProps<{
    maxWidth?: number;
  //   maxHeight: number;
  //   direction: "column" | "row";
  //   alignItems: "start" | "end" | "center";
  gap: number;
}>();
const group = ref<InstanceType<typeof Group>>();
const update = () => {
  const children = group.value?.children;
  if (!children?.length) return;

  const sum = sumBy(children, (it) => it.getBoundingClientRect().width);
  const all = sum + props.gap * (children.length - 1);
  let start = -all / 2;

  children.forEach((it) => {
    it.style.transform = `translate(${start})` ;
    // it.style.y = 0;
    start += it.getBoundingClientRect().width + props.gap;
    // console.log(start)
  });
};

onUpdated(() => {
  console.log(2);
  update();
});
onMounted(() => {
  console.log(1);
  update();
});
</script>

<style lang="scss"></style>
