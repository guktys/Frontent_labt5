import i18n from "@/i18n"
import { nextTick } from "vue"
const Trans = {
    async loadLocaleMessages(locale) {
        if(!i18n.global.availableLocales.includes(locale)) {  // <--- 3
            const messages = await import(`@/i18n/locales/${locale}.json`)  // <--- 4
            i18n.global.setLocaleMessage(locale, messages.default)  // <--- 5
        }

        return nextTick()  // <--- 6
    },
    get currentLocale() {
        return i18n.global.locale.value
    },
    i18nRoute(to) {
        return {
            ...to,
            params: {
                locale: Trans.currentLocale,
                ...to.params
            }
        }
    },
    async routeMiddleware(to, _from, next) {
        const paramLocale = to.params.locale
        if(!Trans.isLocaleSupported(paramLocale)) {
            return next(Trans.guessDefaultLocale())
        }
        await Trans.switchLanguage(paramLocale)
        return next()
    },
    get defaultLocale() {
        return import.meta.env.VITE_DEFAULT_LOCALE
    },
    guessDefaultLocale() {
        const userPersistedLocale = Trans.getPersistedLocale()
        if(userPersistedLocale) {
            return userPersistedLocale
        }
        const userPreferredLocale = Trans.getUserLocale()
        if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
            return userPreferredLocale.locale
        }
        if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
            return userPreferredLocale.localeNoRegion
        }

        return Trans.defaultLocale
    },
    isLocaleSupported(locale) { // <--- 1
        return Trans.supportedLocales.includes(locale)
    },
    getUserLocale() { // <--- 2
        const locale = window.navigator.language ||
            window.navigator.userLanguage ||
            Trans.defaultLocale
        return {
            locale: locale,
            localeNoRegion: locale.split('-')[0]
        }
    },

    getPersistedLocale() { // <--- 3
        const persistedLocale = localStorage.getItem("user-locale")
        if(Trans.isLocaleSupported(persistedLocale)) {
            return persistedLocale
        } else {
            return null
        }
    },

    set currentLocale(newLocale) { // <--- 2
        i18n.global.locale.value = newLocale
    },
    async switchLanguage(newLocale) {
        await Trans.loadLocaleMessages(newLocale)
        Trans.current_locale = newLocale
        document.querySelector("html").setAttribute("lang", newLocale)
        localStorage.setItem("user-locale", newLocale) // <--- add this
    },
    get supportedLocales() {
        return import.meta.env.VITE_SUPPORTED_LOCALES.split(",")
    }
}
export default Trans