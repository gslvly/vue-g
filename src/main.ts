import { createVaporApp } from "vue/vapor";

import "./style.css";
const create = createVaporApp;

import("./App.vue").then(res => {
    create(res.default as any).mount("#app");
})



