export const xlinkNS = "http://www.w3.org/1999/xlink";

export function patchAttr(el: Element, key: string, value: any): void {
  // attribute value is a string https://html.spec.whatwg.org/multipage/dom.html#attributes
  el.setAttribute(key, value);
}
