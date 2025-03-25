import { patchClass } from "./modules/class";
import { patchStyle } from "./modules/style";
import { patchAttr } from "./modules/attrs";
import { patchEvent } from "./modules/events";
import { isModelListener, isOn } from "./share";
import type { RendererOptions } from "vue";

type DOMRendererOptions = RendererOptions<Node, Element>;

export const patchProp: DOMRendererOptions["patchProp"] = (
  el,
  key,
  prevValue,
  nextValue,
  namespace,
  parentComponent
) => {
  if (key === "class") {
    patchClass(el, nextValue);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    // ignore v-model listeners
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else {
    patchAttr(el, key, nextValue);
  }
};
