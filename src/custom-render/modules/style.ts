import { isArray, isString } from "../share";
type Style = string | Record<string, string | string[]> | null;

export function patchStyle(el: Element, prev: Style, next: Style): void {
  const style = (el as HTMLElement).style;
  const isCssString = isString(next);
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
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next as string;
      }
    } else if (prev) {
      el.removeAttribute("style");
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
