import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import router from "./router/index"
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import { setPrimeVueComponents } from "./modules/primevue.module";
import { setComponents } from "./modules/components.module";
import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: "p",
            darkModeSelector: "white",
            cssLayer: false,
        }
    }
});

setPrimeVueComponents(app);
setComponents(app);
app.use(router);
app.use(ToastService);
app.mount("#app");

export default app;
