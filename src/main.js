import { createApp } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

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
window.HelloWorld = createComponentInstance(HelloWorld);