<template>
  <g-group ref="group">
    <slot></slot>
  </g-group>
</template>

<script lang="ts" setup>
import { DisplayObject, type Group } from "@antv/g";
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
  let maxWidth = 0;
  let maxHeight = 0;

  const children = group.value?.children
    ?.map((it) => {
      const rectangle = it.getBoundingClientRect();
      if (rectangle.width) {
        maxHeight = Math.max(rectangle.height, maxHeight);
        maxWidth = Math.max(rectangle.width, maxWidth);
        return [it as DisplayObject, rectangle] as const;
      }
    })
    .filter(Boolean);

  if (!children?.length) return;
  const groupPos = group.value!.getBoundingClientRect()!;
const g = group.value
window.g = g
  const sum = sumBy(children, (it) => it[1].width);

  const all = sum + props.gap * (children.length - 1);
  let start = -all / 2;
  console.log(children.map((it) => it[1]), groupPos);
  window.temp = children;

  children.forEach((it) => {
    // console.log(start);
    const [node, rect] = it!;

    // 距离group

    // node.setLocalPosition(groupPos.x, groupPos.y, 500);
    // node.setLocalPosition(groupPos.x)

    start += rect.width + props.gap;

    // it.style.y = 0;
    // start += it.getBoundingClientRect().width + props.gap;
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
