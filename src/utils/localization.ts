import * as Localization from 'expo-localization';
import crashlytics from '../services/Crashlytics';
import { DICTYONARY_PATH } from './config';
import i18n from 'i18n-js';
import { memoize } from 'lodash';
import storage from '../services/Storage';

const getDictionaryFile = async (lang: string): Promise<Record<string, unknown>> => {
  let url: string;
  try {
    url = await storage()
      .ref()
      // @TODO move file name to config
      .child(`${DICTYONARY_PATH}${lang}.json`)
      .getDownloadURL();
  } catch (e) {
    crashlytics().recordError(e);
  }
  return new Promise(resolve => {
    fetch(url).then(response => {
      resolve(response.json());
    });
  });
};

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: (): Promise<Record<string, unknown>> => getDictionaryFile('en'),
  es: (): Promise<Record<string, unknown>> => getDictionaryFile('es'),
};

export const translate = memoize(
  (key, config?) => i18n.t(key, config),
  (key, config?) => (config ? key + JSON.stringify(config) : key),
);

export const getLocale = (): string => i18n.locale;
export const getDayRefFormat = (locale: string = getLocale()) => {
  switch (locale) {
    case 'es':
      return 'DD [de] MMMM';
    default:
      return 'MMMM Do';
  }
};

// in Spanish verbs in past participle are pluralizable meanwhile in English they aren't.
// currently only en is not pluralizeble.
export const isPastParticiplePluralizable = (locale: string = getLocale()) =>
  ({
    en: false,
    es: true,
  }[locale]);

export const setI18nConfig = async (callback: (value: boolean) => void) => {
  // fallback if no available language fits
  const fallback = 'en';

  const { locale: localeComplete } = await Localization.getLocalizationAsync();
  let locale = localeComplete.split('-')[0]; // It comes in the form xx-XX, we only need the first two letters

  if (!Object.keys(translationGetters).includes(locale)) locale = fallback;

  const languageTag: keyof typeof translationGetters = locale as keyof typeof translationGetters;

  const dictionary = await translationGetters[languageTag]();
  // set i18n-js config
  // clear translation cache
  if (translate.cache.clear) translate.cache.clear();
  i18n.translations = { [languageTag]: dictionary };
  i18n.locale = languageTag;
  callback(true);
};
