// src/umd-entry.js
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import i18n from "./i18n";

import "@/assets/base.css";
import "@/assets/custom.css";
import "@/assets/tailwind.css";
import '@primeuix/themes/aura'; // theme chính
import 'primeicons/primeicons.css'; // icons


import TreeComponent from "@/components/TreeComponent.vue";
import SearchMultiple from "@/components/common/SearchMultiple.vue";
import DropComponent from "@/components/DropComponent.vue";

function createComponentInstance(Component) {
  return class {
    constructor(selector, props = {}) {
      const el = typeof selector === "string" ? document.querySelector(selector) : selector;
      if (!el) throw new Error(`Không tìm thấy element: ${selector}`);
      this.app = createApp(Component, props);
      this.app.use(PrimeVue, {
        theme: {
          preset: Aura,
          options: { prefix: "p", darkModeSelector: ".app-dark" },
        },
      });
      this.app.use(i18n);
      this.vm = this.app.mount(el);
    }
    unmount() {
      this.app.unmount();
    }
  };
}

window.TreeComponent = createComponentInstance(TreeComponent);
window.SearchMultiple = createComponentInstance(SearchMultiple);
window.DropComponent = createComponentInstance(DropComponent);
