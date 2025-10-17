import { createApp, h } from 'vue';
import singleSpaVue from "single-spa-vue";

import App from "./App.vue";

import "@/assets/custom.css";
import "@/assets/tailwind.css";
import '@/assets/styles.scss';
import 'primeicons/primeicons.css';
// import 'font-awesome/css/font-awesome.min.css';
// import "@app/app-formui/dist/style.css";
// import "app-camunda-oda/dist/my-bpmn-widget.iife";
// import "app-camunda-oda/dist/style.css";
import Aura from '@primeuix/themes/aura';
import PrimeVue from "primevue/config";
// import MyLib from '@app/app-formui'
// import "@app/app-formui/dist/style.css";
import i18n from './i18n/index.js';
import TreeComponent from '@/components/TreeComponent.vue'
import SearchMultiple from '@/components/common/SearchMultiple.vue';
import DropComponent from '@/components/DropComponent.vue';

// interface CustomProps extends SingleSpaProps {
//   name: string;
//   mountParcel: any;
//   singleSpa: any;
//   [key: string]: unknown;
// }

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: ".app-dark",
    },
  },
})
app.use(i18n)
app.mount('#app')

// export const bootstrap = vueLifecycles.bootstrap;
// export const mount = vueLifecycles.mount;
// export const unmount = vueLifecycles.unmount;

function createComponentInstance(Component) {
    return class {
        constructor(selector, props = {}) {
            const el = typeof selector === "string" ? document.querySelector(selector) : selector;
            if (!el) throw new Error(`Không tìm thấy element: ${selector}`);
            this.app = createApp(Component, props);
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
window.TreePo = createComponentInstance(TreePo)
console.log(window);