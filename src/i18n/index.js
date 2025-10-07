import { createI18n } from 'vue-i18n';
import en from './locales/en.json';

const messages = {
  en
};

const i18n = createI18n({
  locale: 'en', // set locale
  legacy: false, // for latest vuei18n with compo API
  messages
});

export default i18n