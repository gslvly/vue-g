import { patchClass } from "./modules/class";
import { patchStyle } from "./modules/style";
import { patchAttr } from "./modules/attrs";
import { patchEvent } from "./modules/events";
import { isModelListener, isOn, isString } from "@vue/shared";
import type { RendererOptions } from "@vue/runtime-core";

const isNativeOn = (key: string) =>
  key.charCodeAt(0) === 111 /* o */ &&
  key.charCodeAt(1) === 110 /* n */ &&
  // lowercase letter
  key.charCodeAt(2) > 96 &&
  key.charCodeAt(2) < 123;

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

function shouldSetAsProp(
  el: Element,
  key: string,
  value: unknown,
  isSVG: boolean
) {
  // these are enumerated attrs, however their corresponding DOM properties
  // are actually booleans - this leads to setting it with a string "false"
  // value leading it to be coerced to `true`, so we need to always treat
  // them as attributes.
  // Note that `contentEditable` doesn't have this problem: its DOM
  // property is also enumerated string values.
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }

  // #1787, #2840 form property on form elements is readonly and must be set as
  // attribute.
  if (key === "form") {
    return false;
  }

  // #1526 <input list> must be set as attribute
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }

  // #2766 <textarea type> must be set as attribute
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }

  // #8780 the width or height of embedded tags must be set as attribute
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (
      tag === "IMG" ||
      tag === "VIDEO" ||
      tag === "CANVAS" ||
      tag === "SOURCE"
    ) {
      return false;
    }
  }

  // native onclick with string value, must be set as attribute
  if (isNativeOn(key) && isString(value)) {
    return false;
  }

  return key in el;
}
