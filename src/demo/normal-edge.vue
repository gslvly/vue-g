<template>
  <g-group
    v-if="cfg"
    :style="{ transform: `translate(${start.x},${start.y})` }"
  >
    <g-line
      v-if="cfg.type === 'l'"
      :style="{
        x1: cfg.x1,
        y1: cfg.y1,
        x2: cfg.x2,
        y2: cfg.y2,
        stroke: 'red',
        lineWidth: 2,
        increasedLineWidthForHitTesting: 8,
        markerEnd: arrow,
      }"
    ></g-line>
    <g-path
      v-else
      :style="{
        d: cfg.d,
        lineWidth: 2,
        stroke: 'blue',
        zIndex: 10,
        markerEnd: arrow,
        increasedLineWidthForHitTesting: 8,
      }"
    >
    </g-path>
    <g-text
      :style="{
        fill: '#000',
        textAlign: 'center',
        textBaseline: 'middle',
        increasedLineWidthForHitTesting: 8,
        transform: `matrix3d(${cfg.labelMatrix.toString()})`,
      }"
      @click="clickEdge()"
      ref="text"
      >{{ cfg.label }}</g-text
    >
  </g-group>
</template>

<script lang="ts" setup name="normalEdge">
import { IEdge } from "../type";
import { injectDataManager } from "./dataManager";
import utils from "@antv/g-math";
import gDom from "./g-dom.vue";

import {
  normalVec,
  rotate,
  rotateRadian,
  toMat4,
  transform,
  translate,
  unitVec,
} from "./utils/math";
import { arrow } from "./utils/shape";
import { randomColor } from "./utils/tool";
const { getNodeById } = injectDataManager();
const props = defineProps<{
  edge: IEdge;
}>();

const getLabel = () => {
  return props.edge.tokenStats.map((it) => it.tokenName);
};

const text = shallowRef();

const start = computed(() => {
  return getNodeById(props.edge.source);
});

const getVec = () => {
  const edge = props.edge;
  let start = getNodeById(edge.source)!;
  const end = getNodeById(edge.target)!;
  if (!start || !end) return null;
  return [end.x - start.x, end.y - start.y] as [number, number];
};

const getL = () => {
  const edge = props.edge;
  const vec = getVec();
  if (!vec) return null;
  let start = getNodeById(edge.source)!;
  const end = getNodeById(edge.target)!;

  const dir = unitVec(vec as [number, number]);

  const s = {
    x: dir[0] * (start.size + 10),
    y: dir[1] * (start.size + 10),
  };

  const e = {
    x: vec[0] - dir[0] * (end.size + 10),
    y: vec[1] - dir[1] * (end.size + 10),
  };

  const labelMatrix = toMat4(
    transform(
      translate(vec[0] / 2, vec[1] / 2),
      rotateRadian(Math.atan(vec[1] / vec[0]))
    )
  );
  const colors = randomColor();
  return {
    type: "l",
    x1: s.x,
    y1: s.y,
    x2: e.x,
    y2: e.y,
    label: "8比/共123usdt",
    labelMatrix,
  };
};

const getQ = () => {
  const edge = props.edge;
  let s = getNodeById(edge.source)!;
  const e = getNodeById(edge.target)!;
  const vec = getVec();
  if (!vec) return null;
  const [x, y] = normalVec(vec);

  let cLen = 80;

  const a = [vec[0] / 2, vec[1] / 2] as const;
  // x * 10 + a[0], y * 10 + a[1]
  const d = [] as string[];
  const cVec = [x * cLen, y * cLen];
  const c = [cVec[0] + a[0], cVec[1] + a[1]] as [number, number];
  const sc = unitVec(c);
  const ec = unitVec([c[0] - vec[0], c[1] - vec[1]]);

  d.push(`M ${sc[0] * (s.size + 10)}, ${sc[1] * (s.size + 10)}`);
  d.push(
    `Q ${c[0]},${c[1]} ${vec[0] + ec[0] * (e.size + 10)},${
      vec[1] + ec[1] * (e.size + 10)
    }`
  );

  const labelMatrix = toMat4(
    transform(
      translate((x * cLen) / 2 + a[0], (y * cLen) / 2 + a[1]),
      rotateRadian(Math.atan(vec[1] / vec[0]))
    )
  );

  return {
    type: "q",
    d: d.join(" "),
    label: "8比/共123usdt",
    labelMatrix,
  };
};

const cfg = computed(() => {
  const edge = props.edge;
  if (edge.type === "l") return getL();
  return getQ();
});

const clickEdge = (v) => {
  console.log(text.value);
  window.text = text.value;
};
</script>

<style lang="scss">
.t1 {
  position: absolute;
  top: 0;
  left: 10px;
}
</style>
