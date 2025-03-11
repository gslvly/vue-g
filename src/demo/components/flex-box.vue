<template>
  <g-group ref="group">
    <slot></slot>
  </g-group>
</template>

<script lang="ts" setup>
/**相当于align-items:center;flex-wrap:no-wrap; */
defineOptions({ name: "g-flexbox" });

import { DisplayObject, type Group } from "@antv/g";
import { sumBy } from "lodash-es";

const props = withDefaults(
  defineProps<{
    direction?: "column" | "row";
    gap?: number;
  }>(),
  {
    direction: "row",
    gap: 0,
  }
);

const group = ref<InstanceType<typeof Group>>();

const getChildren = () => {
  if (!group.value) return;

  const children = group.value?.children
    ?.map((it) => {
      it.setAttribute("transform", "none");

      const rectangle = (it as DisplayObject).getBBox();
      if (rectangle.width) {
        return [it as DisplayObject, rectangle] as const;
      }
    })
    .filter(Boolean);

  if (!children?.length) return;
  return children;
};

const updateRow = () => {
  const children = getChildren();
  if (!children) return;
  const groupPos = group.value!.getPosition()!;
  const sum = sumBy(children, (it) => it![1].width);

  const all = sum + props.gap * (children.length - 1);
  const start = -all / 2;
  let preX = start;
  children.forEach((it) => {
    const [node, rect] = it!;

    // 距离中心点
    const dx = rect.x - groupPos[0];
    const dy = rect.y - groupPos[1];

    node.style.transform = `translate(${preX - dx},${-rect.height / 2 - dy})`;
    preX += rect.width + props.gap;
  });
};

const updateColumn = () => {
  const info = getChildren();
  if (!info) return;
  const children = info;
  const groupPos = group.value!.getPosition()!;

  const sum = sumBy(children, (it) => it![1].height);

  const all = sum + props.gap * (children.length - 1);
  const start = -all / 2;
  let preY = start;
  children.forEach((it) => {
    const [node, rect] = it!;

    // 距离中心点
    const dx = rect.x - groupPos[0];
    const dy = rect.y - groupPos[1];

    node.style.transform = `translate(${-rect.width / 2 - dx},${preY - dy})`;
    preY += rect.height + props.gap;
  });
};

const update = () => {
  if (props.direction === "row") updateRow();
  else updateColumn();
};

onUpdated(() => {
  update();
});
onMounted(() => {
  update();
});
</script>

<style lang="scss"></style>
