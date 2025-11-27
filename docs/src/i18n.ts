import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ro from './locales/ro.json'

export const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        ro
    }
})

export default i18n
