# vue-g demo

将 antv/g 的基础图形伪装成 dom，实现 vue3 控制图形显示

## 组件
normal-circle.vue
```html
<template>
  <g-group
    ref="g"
    :id="node.id"
    :style="{
      transform: `translate(${node.x},${node.y})`
    }"
    @click="click"
  >
    <g-circle
      style="fill: red; stroke: #f04864"
      :style="{
        r: node.size,
      }"
    ></g-circle>
    
  </g-group>
</template>

<script lang="ts" setup name="selfNode">
  const props = defineProps<{
    node: { x: number; y: number;size:number; text: string };
  }>();
  let n = ref(0);

  const click = () => {
    console.log(props.node);
  };
</script>
```
## 挂载
```ts
import { createApp } from "../custom-render";
import { Renderer } from "@antv/g-canvas";
import { Canvas } from "@antv/g";
import normalCircle from './normal-circle.vue'

const createGApp = async (dom: HTMLDivElement) => {
  const renderer = new Renderer({
    enableDirtyRectangleRenderingDebug: false,
    enableDirtyRectangleRendering: true,
  });
  const canvas = new Canvas({
    container: dom,
    width: 1000,
    height: 1000,
    renderer,
  });
  await canvas.ready;
  const root = canvas.getRoot();

  createApp(normalCircle).mount(canvas);

  return canvas;
};

```

