import { onMounted, createVaporApp, ref } from "vue/vapor";
import { Canvas, Circle, Text } from "@antv/g-lite";
import { Renderer } from "@antv/g-canvas";

export const useApi = () => {
  onMounted(async () => {
    const canvas = new Canvas({
      container: "container",
      width: 600,
      height: 500,
      renderer: new Renderer(),
    });
    console.log(canvas.getRoot().translateLocal(100, 100));
    await canvas.ready;
    const circle = new Circle({
      style: {
        r: 50,
        fill: "#1890FF",
        stroke: "#F04864",
        lineWidth: 4,
        cursor: "pointer",
        transform: "translate(100,100)",
      },
    });
    const text = new Text({
      style: {
        x: 0,
        y: 0,
        textAlign: "center",
        text: "Hello, World!",
        fill: "red",
        fontSize: 20,
      },
    });
    setTimeout(() => {
      circle.appendChild(text);
    }, 1000);
    console.log(circle)
    canvas.appendChild(circle);
  });
};
