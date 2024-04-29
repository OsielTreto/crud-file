// plugins/i18n.ts
import { createI18n } from "vue-i18n";
import { en, es } from "vuetify/locale";

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false, // necesario para Vue 3
    locale: "es", // define el idioma predeterminado
    messages: {
      en: {
        $vuetify: {
          ...en,
          dataFooter: {
            itemsPerPageText: "Items per page:",
            pageText: "{0}-{1} of {2}",
          },
        },
      },
      es: {
        $vuetify: {
          ...es,
          dataFooter: {
            itemsPerPageAll: "Todos",
            itemsPerPageText: "Elementos por página:",
            pageText: "{0}-{1} de {2}",
          },
        },
        // otros mensajes y etiquetas
      },
      // puedes agregar más idiomas aquí
    },
  });

  nuxtApp.vueApp.use(i18n);
});
