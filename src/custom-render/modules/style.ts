import { isArray, isString } from "@vue/shared";
import {
  type VShowElement,
  vShowHidden,
  vShowOriginalDisplay,
} from "../directives/vShow";

type Style = string | Record<string, string | string[]> | null;

const displayRE = /(^|;)\s*display\s*:/;

export function patchStyle(el: Element, prev: Style, next: Style): void {
  const style = (el as HTMLElement).style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next as string;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  // indicates the element also has `v-show`.
  if (vShowOriginalDisplay in el) {
    // make v-show respect the current v-bind style display when shown
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    // if v-show is in hidden state, v-show has higher priority
    if ((el as VShowElement)[vShowHidden]) {
      style.display = "none";
    }
  }
}

function setStyle(
  style: CSSStyleDeclaration,
  name: string,
  val: string | string[]
) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    style.setProperty(name, val);
  }
}
