import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { mdi } from "vuetify/iconsets/mdi";
import "vuetify/styles";

export default createVuetify({
  blueprint: md3,
  components,
  directives,
  theme: {
    defaultTheme: "light"
  },
  icons: {
    defaultSet: "mdi",
    sets: {
      mdi
    }
  }
});
