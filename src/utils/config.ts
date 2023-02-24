import { getMindcotineTheme, getMindcotineSmallTheme } from '@mindcoxr/rob'

export const DICTYONARY_PATH = 'dictionaries/v5.0_'
export const PROGRAM_PATH = 'quests_4.16.3_'
export const getProductTheme = (isSmallDevice: boolean) => {
  if (isSmallDevice) {
    return getMindcotineSmallTheme()
  } else {
    return getMindcotineTheme()
  }
}
export const legalUrl = 'https://mindcotine.com/terms-of-use'
export const homeBGColors: [string, string] = ['#32e4e8', '#083434']
export const URL_UI_SUPPORT = 'https://www.mindcotine.com/wp-content/assets/support/index.html'
export const URL_UI_COACHING = 'https://app.mindcotine.com/support/coach/'
export const BREAK_DIMENSION = 5.3
export const BREAK_INCHES = 5
