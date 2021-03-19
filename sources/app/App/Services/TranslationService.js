import {I18nManager} from 'react-native'
// import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'
import memoize from 'lodash.memoize'
import ApolloClientService from 'App/Services/GraphQL/ApolloClientService'
import StorageService from 'App/Services/AsyncStorage/StorageService'

const ENGLISH = 'en'
const CHINESE = 'zh'
const DEFAULT_LANGUAGE = ENGLISH

const translationGetters = {
  en: () => require('App/Services/Locales/en.json'),
  zh: () => require('App/Services/Locales/zh.json'),
}

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
)

// If language is null, we try to select the device's language (if exists), otherwise we set to default one
const resetLanguage = (language = null) => {
  let languageTag = DEFAULT_LANGUAGE
  let isRTL = false

  if (!language) {
    // TODO: uncomment when zh.json is ready
    // const bestLang = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters))
    // if (bestLang) {
    //   languageTag = bestLang.languageTag
    // }
  } else {
    if (Object.keys(translationGetters).includes(language)) {
      languageTag = language
    }
  }

  // clear translation cache
  translate.cache.clear()
  // update layout direction
  I18nManager.forceRTL(isRTL)

  // set i18n-js config
  i18n.translations = {[languageTag]: translationGetters[languageTag]()}
  i18n.locale = languageTag

  // Save lang to AsyncStorage
  global.storage.save({
    key: StorageService.LANG_KEY,
    data: languageTag,
  })

  return ApolloClientService.client.clearStore()
}

const getCurrentLanguage = () => {
  return i18n.locale
}

const languageIsChinese = () => {
  return i18n.locale === CHINESE
}

export default {
  //   FRENCH,
  CHINESE,
  ENGLISH,
  DEFAULT_LANGUAGE,
  translate,
  resetLanguage,
  getCurrentLanguage,
  languageIsChinese,
}
