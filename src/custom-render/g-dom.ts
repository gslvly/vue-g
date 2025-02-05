import { DisplayObject } from "@antv/g";
import { render, useSlots } from "vue";
export default defineComponent({
  name: "gDom",
  props: {
    to: String,
  },
  setup(props) {
    const slots = useSlots();
    let doms = [] as HTMLElement[];
    return () => {
      const div = document.createElement("div");
      const vDoms = slots.default?.();
      doms.forEach((it) => it.remove());
      doms.length = 0;
      if (vDoms) {
        vDoms.forEach((it) => {
       
          render(it, div);
        });
        div.childNodes.forEach((it) => {
          doms.push(it);
          document.querySelector(props.to || "body")?.appendChild(it);
        });
      }
      return new DisplayObject({});
    };
  },
});
