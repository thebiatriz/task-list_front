import Button from "primevue/button";
import Card from "primevue/card";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import DataView from "primevue/dataview";
import DatePicker from "primevue/datepicker";
import Dialog from "primevue/dialog";
import Drawer from "primevue/drawer";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";
import Paginator from "primevue/paginator";
import ProgressSpinner from "primevue/progressspinner";
import RadioButton from "primevue/radiobutton";
import Select from "primevue/select";
import Skeleton from "primevue/skeleton";
import Tag from "primevue/tag";
import Toast from "primevue/toast";
import Toolbar from "primevue/toolbar";

import type { App } from "vue";

export function setPrimeVueComponents(app: App) {
    app.component("Button", Button);
    app.component("Card", Card);
    app.component("Column", Column);
    app.component("DataTable", DataTable);
    app.component("DataView", DataView);
    app.component("DatePicker", DatePicker);
    app.component("Dialog", Dialog);
    app.component("Drawer", Drawer);
    app.component("IconField", IconField);
    app.component("InputIcon", InputIcon);
    app.component("InputNumber", InputNumber);
    app.component("InputText", InputText);
    app.component("Menu", Menu);
    app.component("Menubar", Menubar);
    app.component("Paginator", Paginator);
    app.component("ProgressSpinner", ProgressSpinner);
    app.component("RadioButton", RadioButton);
    app.component("Select", Select);
    app.component("Skeleton", Skeleton);
    app.component("Tag", Tag);
    app.component("Toast", Toast);
    app.component("Toolbar", Toolbar);
}