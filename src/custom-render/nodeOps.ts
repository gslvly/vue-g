
import type { RendererOptions } from "@vue/runtime-core";

export const svgNS = "http://www.w3.org/2000/svg";
export const mathmlNS = "http://www.w3.org/1998/Math/MathML";

const doc = (typeof document !== "undefined" ? document : null) as Document;

export const nodeOps: Omit<RendererOptions<Node, Element>, "patchProp"> = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },

  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },

  createElement: (tag, namespace, is, props): Element => {
    const el =
      namespace === "svg"
        ? doc.createElementNS(svgNS, tag)
        : namespace === "mathml"
        ? doc.createElementNS(mathmlNS, tag)
        : is
        ? doc.createElement(tag, { is })
        : doc.createElement(tag);

    if (tag === "select" && props && props.multiple != null) {
      (el as HTMLSelectElement).setAttribute("multiple", props.multiple);
    }

    return el;
  },

  createText: (text) => doc.createTextNode(text),

  createComment: (text) => doc.createComment(text),

  setText: (node, text) => {
    node.nodeValue = text;
  },

  setElementText: (el, text) => {
    el.textContent = text;
  },

  parentNode: (node) => node.parentNode as Element | null,

  nextSibling: (node) => node.nextSibling,

  querySelector: (selector) => doc.querySelector(selector),

  setScopeId(el, id) {
    el.setAttribute(id, "");
  },


  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    // <parent> before | first ... last | anchor </parent>
    throw new Error("不支持html字符串");
  },
};
