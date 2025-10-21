// src/umd-entry.js
import { createApp, h, reactive, ref, toRefs } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import i18n from "./i18n";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from 'primevue/toastservice'



import "@/assets/custom.css";
import "@/assets/tailwind.css";
import '@primeuix/themes/aura';
import 'primeicons/primeicons.css';


import TreeComponent from "@/components/TreeComponent.vue";
import SearchMultiple from "@/components/common/SearchMultiple.vue";
import DropComponent from "@/components/DropComponent.vue";
import TreePo from "@/components/TreePoComponent.vue";

function toVueListenerKey(name) {
    if (name.includes(':')) {
        const [head, ...rest] = name.split(':')
        return 'on' + head[0].toUpperCase() + head.slice(1) + ':' + rest.join(':')
    }
    return 'on' + name[0].toUpperCase() + name.slice(1)
}

function createComponentInstance(Component) {
    return class {
        constructor(selector, options = {}) {
            const el = typeof selector === 'string' ? document.querySelector(selector) : selector
            if (!el) throw new Error(`Không tìm thấy phần tử: ${selector}`)

            // reactive props, so setProps() works
            this._props = ref({...(options.props ?? options)})

            const on = options.on ?? {}
            const listeners = Object.fromEntries(
                Object.entries(on).map(([k, fn]) => [toVueListenerKey(k), fn])
            )

            const compRef = ref(null) // ← will hold App.vue’s exposed API

            const Root = {
                setup: () => {
                    return () =>
                    h(Component, {
                        ...this._props,
                        ...listeners,
                        ref: compRef,
                    });
                },
            };


            this._compRef = compRef
            this.app = createApp(Root)
            this.app.use(PrimeVue, {theme: {preset: Aura, options: {prefix: 'p', darkModeSelector: '.app-dark'}}})
            this.app.use(ConfirmationService)
            this.app.use(i18n)
            this.app.use(ToastService);
            this.vm = this.app.mount(el)
        }


        call(method, ...args) {
            const exp = this._compRef.value
            if (!exp || typeof exp[method] !== 'function') {
                throw new Error(`Exposed method "${method}" not found on App.vue`)
            }
            console.log("exp[method]", exp)
            return exp[method](...args)
        }

        /** Optional shortcut to the exposed object */
        get exposed() {
            return this._compRef.value
        }

        setProps(next) {
            this._props.value = { ...this._props.value, ...next };
        }

        on(eventName, handler) {
            this._props[toVueListenerKey(eventName)] = handler
        }

        unmount() {
            this.app.unmount()
        }
    }
}


window.TreeComponent = createComponentInstance(TreeComponent);
window.SearchMultiple = createComponentInstance(SearchMultiple);
window.DropComponent = createComponentInstance(DropComponent);
window.TreePo = createComponentInstance(TreePo)
