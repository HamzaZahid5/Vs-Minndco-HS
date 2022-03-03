import * as Localization from 'expo-localization'
import crashlytics from '../services/Crashlytics'
import { DICTYONARY_PATH } from './config'
import i18n from 'i18n-js'
import moment from 'moment'
import Countdown from 'countdown'
import { memoize } from 'lodash'
import { LocaleConfig } from 'react-native-calendars'
import storage from '../services/Storage'
import { languagesType } from '../../types'

const getDictionaryFile = async (lang: string): Promise<Record<string, unknown>> => {
  let url: string
  try {
    url = await storage()
      .ref()
      // @TODO move file name to config
      .child(`${DICTYONARY_PATH}${lang}.json`)
      .getDownloadURL()
  } catch (e) {
    crashlytics().recordError()
  }
  return new Promise(resolve => {
    fetch(url).then(response => {
      resolve(response.json())
    })
  })
}

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: (): Promise<Record<string, unknown>> => getDictionaryFile('en'),
  es: (): Promise<Record<string, unknown>> => getDictionaryFile('es'),
}

export const translate = memoize(
  (key, config?) => i18n.t(key, config),
  (key, config?) => (config ? key + JSON.stringify(config) : key),
)

export const getLocale = (): string => i18n.locale
export const getDayRefFormat = (locale: string = getLocale()) => {
  switch (locale) {
    case 'es':
      return 'DD/MM'
    default:
      return 'MMMM Do'
  }
}

// in Spanish verbs in past participle are pluralizable meanwhile in English they aren't.
// currently only en is not pluralizeble.
export const isPastParticiplePluralizable = (locale: string = getLocale()) =>
  ({
    en: false,
    es: true,
  }[locale])

export const setI18nConfig = async (callback: (value: boolean) => void) => {
  // fallback if no available language fits
  const fallback = 'en'

  const { locale: localeComplete } = await Localization.getLocalizationAsync()
  let locale = localeComplete.split('-')[0] // It comes in the form xx-XX, we only need the first two letters

  if (!Object.keys(translationGetters).includes(locale)) locale = fallback

  const languageTag: keyof typeof translationGetters = locale as keyof typeof translationGetters

  const dictionary = await translationGetters[languageTag]()
  // set i18n-js config
  // clear translation cache
  if (translate.cache.clear) translate.cache.clear()
  i18n.translations = { [languageTag]: dictionary }
  conditionalLocaleImport(languageTag)
  i18n.locale = languageTag
  // === CONFIG ===
  // Countdown
  Countdown.setLabels(...getCountDownLabels(i18n.locale))
  // Calendar
  if (i18n.locale !== 'en') {
    LocaleConfig.locales[i18n.locale] = getCalendarLocaleConfig(i18n.locale)
    LocaleConfig.defaultLocale = i18n.locale
  }
  // ==============
  callback(true)
}

export const getCalendarLocaleConfig = (locale = getLocale()) => {
  switch (locale) {
    case 'es':
      return {
        monthNames: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sáb'],
        today: 'Hoy',
      }
    default:
      return LocaleConfig.locales.en
  }
}

const conditionalLocaleImport = async (lang: languagesType) => {
  switch (lang) {
    case 'es':
      // @ts-ignore non typed
      await import('moment/locale/es')
      break
    default:
  }
  moment.locale(lang)
}

export const getCountDownLabels = (
  locale = getLocale(),
): [string, string, string, string, string, ((value: number) => string) | undefined] => {
  switch (locale) {
    case 'es':
      return [
        ' milisegundo| segundo| minuto| hora| día| semana| mes| año| década| siglo| milenio',
        ' milisegundos| segundos| minutos| horas| días| semanas| meses| años| décadas| siglos| milenios',
        ' y ',
        ', ',
        '',
        (n: number) => n.toString(),
      ]
    default:
      return [
        ' millisecond| second| minute| hour| day| week| month| year| decade| century| millennium',
        ' milliseconds| seconds| minutes| hours| days| weeks| months| years| decades| centuries| millennia',
        ' and ',
        ', ',
        '',
        (n: number) => n.toString(),
      ]
  }
}
