import Vue from 'vue'
import VueI18n from 'vue-i18n'

const config = {
  defLocale: 'en',
  lang: {
    en: {},
    id: {},
    vi: {}
    // zh: {}
  }
}
const _import = lang => {
  try {
    return require(`@locales/lang/${lang}.js`).default // 获取组件的方法
  } catch (e) {
    console.error(e.message)
  }
}

Vue.use(VueI18n)

function exchange(opt) {
  var lang = {}
  for (var k in opt) { lang[k] = _import(k) }
  return lang
}

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') ||
    (navigator.language || navigator.browserLanguage).toLowerCase().substr(0, 2),
  fallbackLocale: config.defLocale,
  silentTranslationWarn: true,
  messages: exchange(config.lang)
})

export default i18n
