import React from 'react'
import BubbleWrap from '../components/LifesaverActivities/BubbleWrapGame'
import BreathSync from '../components/LifesaverActivities/BreathSync'
import DeepBreathSync from '../components/LifesaverActivities/DeepBreathSync'
import { LIFESAVER_PLACES } from '../screens/Lifesaver/constants'
import { translate } from './localization'

export type LifesaverActivityBase = {
  id: string
  title?: string
  free?: boolean
  type: 'audio' | 'activity' | 'text'
  category: 'practical' | 'learning'
}

export type LifesaverDoType = {
  screen: React.ReactElement
} & LifesaverActivityBase

export const LIFESAVER_ACTIVITIES: LifesaverDoType[] = [
  {
    id: 'breath-sync',
    title: 'Breath sync',
    free: true,
    type: 'activity',
    category: 'practical',
    screen: <BreathSync />,
  },
  {
    id: 'deep-breath-sync',
    title: 'Deep breath sync',
    free: true,
    type: 'activity',
    category: 'practical',
    screen: <DeepBreathSync />,
  },
  {
    id: 'bubbles-wrapper',
    title: 'Bubbles wrapper',
    type: 'activity',
    category: 'practical',
    screen: <BubbleWrap />,
  },
]

export type LifesaverAudioType = {
  source: string
  only: string[]
} & LifesaverActivityBase
export const LIFESAVER_AUDIOS = (lang: string): LifesaverAudioType[] => [
  {
    id: 'LS_HOME_calm_en.mp3',
    free: true,
    source: `lifesaver/LS_HOME_calm_${lang}.mp3`,
    only: [LIFESAVER_PLACES.HOME],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_HOME_calm_en'),
  },
  {
    id: 'LS_WORK_visualization_en.mp3',
    source: `lifesaver/LS_WORK_visualization_${lang}.mp3`,
    only: [LIFESAVER_PLACES.WORK],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_WORK_visualization_en'),
  },
  {
    id: 'LS_PARTY_move_your_attention_en.mp3',
    source: `lifesaver/LS_PARTY_move_your_attention_${lang}.mp3`,
    only: [LIFESAVER_PLACES.PARTY],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_PARTY_move_your_attention_en'),
  },
  {
    id: 'LS_PARTY_resist_en.mp3',
    source: `lifesaver/LS_PARTY_resist_${lang}.mp3`,
    only: [LIFESAVER_PLACES.OTHER],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_PARTY_resist_en'),
  },
  {
    id: 'LS_OTHER_love_en.mp3',
    source: `lifesaver/LS_OTHER_love_${lang}.mp3`,
    only: [LIFESAVER_PLACES.OTHER],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_OTHER_love_en'),
  },
  {
    id: 'LS_WORK_calm_en.mp3',
    source: `lifesaver/LS_WORK_calm_${lang}.mp3`,
    only: [LIFESAVER_PLACES.WORK],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_WORK_calm_en'),
  },
  {
    id: 'LS_STREET_breath_en.mp3',
    source: `lifesaver/LS_STREET_breath_${lang}.mp3`,
    only: [LIFESAVER_PLACES.STREET],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_STREET_breath_en'),
  },
  {
    id: 'LS_WORK_positive_perspective_en.mp3',
    source: `lifesaver/LS_WORK_positive_perspective_${lang}.mp3`,
    only: [LIFESAVER_PLACES.WORK],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_WORK_positive_perspective_en'),
  },
  {
    id: 'LS_STREET_pause_en.mp3',
    source: `lifesaver/LS_STREET_pause_${lang}.mp3`,
    only: [LIFESAVER_PLACES.STREET],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_STREET_pause_en'),
  },
  {
    id: 'LS_STREET_step_by_step_en.mp3',
    source: `lifesaver/LS_STREET_step_by_step_${lang}.mp3`,
    only: [LIFESAVER_PLACES.STREET],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_STREET_step_by_step_en'),
  },
  {
    id: 'LS_HOME_compassion.mp3',
    source: `lifesaver/LS_HOME_compassion_${lang}.mp3`,
    only: [LIFESAVER_PLACES.HOME],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_HOME_compassion'),
  },
]
export type LifesaverReadType = {
  contentCategory?: string
  author?: string
  pages: string[]
} & LifesaverActivityBase

export const LIFESAVER_READS = (): LifesaverReadType[] => [
  {
    id: 'testimony-1',
    free: true,
    type: 'text',
    category: 'learning',
    contentCategory: 'testimony',
    title: translate('contents.readTestimony1.title'),
    author: translate('contents.readTestimony1.author'),
    pages: [
      translate('contents.readTestimony1.page1'),
      translate('contents.readTestimony1.page2'),
      translate('contents.readTestimony1.page3'),
    ],
  },
  {
    id: 'testimony-2',
    free: true,
    type: 'text',
    category: 'learning',
    contentCategory: 'testimony',
    title: translate('contents.readTestimony2.title'),
    author: translate('contents.readTestimony2.author'),
    pages: [
      translate('contents.readTestimony2.page1'),
      translate('contents.readTestimony2.page2'),
      translate('contents.readTestimony2.page3'),
      translate('contents.readTestimony2.page4'),
    ],
  },
  {
    id: 'testimony-3',
    free: true,
    type: 'text',
    category: 'learning',
    contentCategory: 'testimony',
    title: translate('contents.readTestimony3.title'),
    author: translate('contents.readTestimony3.author'),
    pages: [
      translate('contents.readTestimony3.page2'),
      translate('contents.readTestimony3.page1'),
      translate('contents.readTestimony3.page3'),
    ],
  },
  {
    id: 'fact-1-tobacco-use',
    free: true,
    type: 'text',
    category: 'learning',
    contentCategory: 'fact',
    title: translate('contents.readFactTobacco.title'),
    pages: [
      translate('contents.readFactTobacco.page1'),
      translate('contents.readFactTobacco.page2'),
      translate('contents.readFactTobacco.page3'),
      translate('contents.readFactTobacco.page4'),
    ],
  },
  {
    id: 'fact-2-nicotine-I',
    free: true,
    type: 'text',
    category: 'learning',
    contentCategory: 'fact',
    title: translate('contents.readFactNicotine1.title'),
    pages: [translate('contents.readFactNicotine1.page1'), translate('contents.readFactNicotine1.page2')],
  },
  {
    id: 'fact-3-nicotine-II',
    free: true,
    type: 'text',
    category: 'learning',
    contentCategory: 'fact',
    title: translate('contents.readFactNicotine2.title'),
    pages: [
      translate('contents.readFactNicotine2.page1'),
      translate('contents.readFactNicotine2.page2'),
      translate('contents.readFactNicotine2.page3'),
    ],
  },
  {
    id: 'fact-4-why-feel-pleasure',
    free: true,
    type: 'text',
    category: 'learning',
    contentCategory: 'fact',
    title: translate('contents.readFactPleasure.title'),
    pages: [
      translate('contents.readFactPleasure.page1'),
      translate('contents.readFactPleasure.page2'),
      translate('contents.readFactPleasure.page3'),
      translate('contents.readFactPleasure.page4'),
    ],
  },
]
