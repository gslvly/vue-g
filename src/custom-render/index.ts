import { createRenderer } from "@vue/runtime-core";
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";
import {
  Circle,
  Group,
  Rect,
  Text,
  DisplayObject,
  Image,
  HTML,
  Line,
  Path,
  Element,
} from "@antv/g";

const ops = {
  ...nodeOps,

  createElement: (v, namespace, is, props) => {
    if (!v.startsWith("g-")) return;
    const name = v.slice(2);

    if (name === "group") {
      return new Group(props);
    }
    if (name === "circle") {
      return new Circle(props);
    }
    if (name === "rect") {
      return new Rect(props);
    }
    if (name === "text") {
      return new Text(props);
    }
    if (name === "image") {
      return new Image(props);
    }
    if (name === "template") {
      return new DisplayObject({});
    }
    if (name === "html") {
      return new HTML(props);
    }
    if (name === "line") {
      return new Line(props);
    }
    if (name === "path") {
      return new Path(props);
    }
  },
  createText: (v) => {
    return new DisplayObject({});
  },
  createComment: (v) => {
    return new DisplayObject({});
  },
  patchProp,
};

const { render: gRender, createApp } = createRenderer(ops);
export { gRender, createApp };
