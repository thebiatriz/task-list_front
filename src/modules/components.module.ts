import deleteDialog from "../components/DeleteDialog/delete-dialog.vue";
import footer from "../components/Footer/footer.vue";
import navbar from "../components/Navbar/navbar.vue";
import viewHeader from "../components/ViewHeader/view-header.vue"

import type { App } from "vue";

export function setComponents(app: App) {
    app.component("DeleteDialog", deleteDialog);
    app.component("Footer", footer)
    app.component("Navbar", navbar);
    app.component("ViewHeader", viewHeader);
}