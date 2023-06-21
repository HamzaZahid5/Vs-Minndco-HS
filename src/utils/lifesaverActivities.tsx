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
  new: boolean
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
    new: false,
  },
  {
    id: 'deep-breath-sync',
    title: 'Deep breath sync',
    free: true,
    type: 'activity',
    category: 'practical',
    screen: <DeepBreathSync />,
    new: false,
  },
  {
    id: 'bubbles-wrapper',
    title: 'Bubbles wrapper',
    type: 'activity',
    category: 'practical',
    screen: <BubbleWrap />,
    new: false,
  },
]

export const fromActivityIdToDictionaryEntry = (id: string) => {
  switch (id) {
    case 'breath-sync':
      return 'BREATH_SYNC'
    case 'deep-breath-sync':
      return 'DEEP_BREATH_SYNC'
    case 'bubbles-wrapper':
      return 'BUBBLE_WRAP'
  }
}

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
    new: false,
  },
  {
    id: 'LS_WORK_visualization_en.mp3',
    source: `lifesaver/LS_WORK_visualization_${lang}.mp3`,
    only: [LIFESAVER_PLACES.WORK],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_WORK_visualization_en'),
    new: false,
  },
  {
    id: 'LS_PARTY_move_your_attention_en.mp3',
    source: `lifesaver/LS_PARTY_move_your_attention_${lang}.mp3`,
    only: [LIFESAVER_PLACES.PARTY],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_PARTY_move_your_attention_en'),
    new: false,
  },
  {
    id: 'LS_PARTY_resist_en.mp3',
    source: `lifesaver/LS_PARTY_resist_${lang}.mp3`,
    only: [LIFESAVER_PLACES.OTHER],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_PARTY_resist_en'),
    new: false,
  },
  {
    id: 'LS_OTHER_love_en.mp3',
    source: `lifesaver/LS_OTHER_love_${lang}.mp3`,
    only: [LIFESAVER_PLACES.OTHER],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_OTHER_love_en'),
    new: false,
  },
  {
    id: 'LS_WORK_calm_en.mp3',
    source: `lifesaver/LS_WORK_calm_${lang}.mp3`,
    only: [LIFESAVER_PLACES.WORK],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_WORK_calm_en'),
    new: false,
  },
  {
    id: 'LS_STREET_breath_en.mp3',
    source: `lifesaver/LS_STREET_breath_${lang}.mp3`,
    only: [LIFESAVER_PLACES.STREET],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_STREET_breath_en'),
    new: false,
  },
  {
    id: 'LS_WORK_positive_perspective_en.mp3',
    source: `lifesaver/LS_WORK_positive_perspective_${lang}.mp3`,
    only: [LIFESAVER_PLACES.WORK],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_WORK_positive_perspective_en'),
    new: false,
  },
  {
    id: 'LS_STREET_pause_en.mp3',
    source: `lifesaver/LS_STREET_pause_${lang}.mp3`,
    only: [LIFESAVER_PLACES.STREET],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_STREET_pause_en'),
    new: false,
  },
  {
    id: 'LS_STREET_step_by_step_en.mp3',
    source: `lifesaver/LS_STREET_step_by_step_${lang}.mp3`,
    only: [LIFESAVER_PLACES.STREET],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_STREET_step_by_step_en'),
    new: false,
  },
  {
    id: 'LS_HOME_compassion.mp3',
    source: `lifesaver/LS_HOME_compassion_${lang}.mp3`,
    only: [LIFESAVER_PLACES.HOME],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_HOME_compassion'),
    new: false,
  },
  // NEW LIFESERVER AUDIOS
  // STREET
  {
    id: 'LS_STREET_sound_awareness_meditation.mp3',
    source: `lifesaver/LS_STREET_sound_awareness_meditation_${lang}.mp3`,
    only: [LIFESAVER_PLACES.STREET],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_STREET_sound_awareness_meditation'),
    new: true,
  },
  {
    id: 'LS_STREET_crave_surf.mp3',
    source: `lifesaver/LS_STREET_crave_surf_${lang}.mp3`,
    only: [LIFESAVER_PLACES.STREET],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_STREET_crave_surf'),
    new: true,
  },
  {
    id: 'LS_STREET_ll1.mp3',
    source: `lifesaver/LS_STREET_ll1_${lang}.mp3`,
    only: [LIFESAVER_PLACES.STREET],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_STREET_ll1'),
    new: true,
  },
  {
    id: 'LS_STREET_street_mindful_observations.mp3',
    source: `lifesaver/LS_STREET_street_mindful_observations_${lang}.mp3`,
    only: [LIFESAVER_PLACES.STREET],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_STREET_street_mindful_observations'),
    new: true,
  },

  // HOME
  {
    id: 'LS_HOME_crave_away_letter_game.mp3',
    source: `lifesaver/LS_HOME_crave_away_letter_game_${lang}.mp3`,
    only: [LIFESAVER_PLACES.HOME],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_HOME_crave_away_letter_game'),
    new: true,
  },
  {
    id: 'LS_HOME_crave_calm.mp3',
    source: `lifesaver/LS_HOME_crave_calm_${lang}.mp3`,
    only: [LIFESAVER_PLACES.HOME],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_HOME_crave_calm'),
    new: true,
  },
  {
    id: 'LS_HOME_crave_surfing_aid.mp3',
    source: `lifesaver/LS_HOME_crave_surfing_aid_${lang}.mp3`,
    only: [LIFESAVER_PLACES.HOME],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_HOME_crave_surfing_aid'),
    new: true,
  },
  {
    id: 'LS_HOME_emotion_explorer.mp3',
    source: `lifesaver/LS_HOME_emotion_explorer_${lang}.mp3`,
    only: [LIFESAVER_PLACES.HOME],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_HOME_emotion_explorer'),
    new: true,
  },

  // OTHER
  {
    id: 'LS_OTHER_crace_busters.mp3',
    source: `lifesaver/LS_OTHER_crace_busters_${lang}.mp3`,
    only: [LIFESAVER_PLACES.OTHER],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_OTHER_crace_busters'),
    new: true,
  },
  {
    id: 'LS_OTHER_mindful_alphabet_game.mp3',
    source: `lifesaver/LS_OTHER_mindful_alphabet_game_${lang}.mp3`,
    only: [LIFESAVER_PLACES.OTHER],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_OTHER_mindful_alphabet_game'),
    new: true,
  },
  {
    id: 'LS_OTHER_smoke_free_mindfulness.mp3',
    source: `lifesaver/LS_OTHER_smoke_free_mindfulness_${lang}.mp3`,
    only: [LIFESAVER_PLACES.OTHER],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_OTHER_smoke_free_mindfulness'),
    new: true,
  },
  {
    id: 'LS_OTHER_walking_meditation_aid.mp3',
    source: `lifesaver/LS_OTHER_walking_meditation_aid_${lang}.mp3`,
    only: [LIFESAVER_PLACES.OTHER],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_OTHER_walking_meditation_aid'),
    new: true,
  },

  // COFFE
  {
    id: 'LS_COFFEE_crave_control.mp3',
    source: `lifesaver/LS_COFFEE_crave_control_${lang}.mp3`,
    only: [LIFESAVER_PLACES.COFFEE],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_COFFEE_crave_control'),
    new: true,
  },
  {
    id: 'LS_COFFEE_facial_muscle_release.mp3',
    source: `lifesaver/LS_COFFEE_facial_muscle_release_${lang}.mp3`,
    only: [LIFESAVER_PLACES.COFFEE],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_COFFEE_facial_muscle_release'),
    new: true,
  },
  {
    id: 'LS_COFFEE_mindful_daily_reflection.mp3',
    source: `lifesaver/LS_COFFEE_mindful_daily_reflection_${lang}.mp3`,
    only: [LIFESAVER_PLACES.COFFEE],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_COFFEE_mindful_daily_reflection'),
    new: true,
  },
  {
    id: 'LS_COFFEE_sensory_mindfulness_for_cravings.mp3',
    source: `lifesaver/LS_COFFEE_sensory_mindfulness_for_cravings_${lang}.mp3`,
    only: [LIFESAVER_PLACES.COFFEE],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_COFFEE_sensory_mindfulness_for_cravings'),
    new: true,
  },

  // PARTY
  {
    id: 'LS_PARTY_crave_free_party_meditation.mp3',
    source: `lifesaver/LS_PARTY_crave_free_party_meditation_${lang}.mp3`,
    only: [LIFESAVER_PLACES.PARTY],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_PARTY_crave_free_party_meditation'),
    new: true,
  },
  {
    id: 'LS_PARTY_grateful_vibes.mp3',
    source: `lifesaver/LS_PARTY_grateful_vibes_${lang}.mp3`,
    only: [LIFESAVER_PLACES.PARTY],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_PARTY_grateful_vibes'),
    new: true,
  },
  {
    id: 'LS_PARTY_mini_mindful_moments.mp3',
    source: `lifesaver/LS_PARTY_mini_mindful_moments_${lang}.mp3`,
    only: [LIFESAVER_PLACES.PARTY],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_PARTY_mini_mindful_moments'),
    new: true,
  },
  {
    id: 'LS_PARTY_smoke_free_statements.mp3',
    source: `lifesaver/LS_PARTY_smoke_free_statements_${lang}.mp3`,
    only: [LIFESAVER_PLACES.PARTY],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_PARTY_smoke_free_statements'),
    new: true,
  },

  // WORK
  {
    id: 'LS_WORK_calm_and_breathe_beat_cravings.mp3',
    source: `lifesaver/LS_WORK_calm_and_breathe_beat_cravings_${lang}.mp3`,
    only: [LIFESAVER_PLACES.WORK],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_WORK_calm_and_breathe_beat_cravings'),
    new: true,
  },
  {
    id: 'LS_WORK_smoke_free_body_scan.mp3',
    source: `lifesaver/LS_WORK_smoke_free_body_scan_${lang}.mp3`,
    only: [LIFESAVER_PLACES.WORK],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_WORK_smoke_free_body_scan'),
    new: true,
  },
  {
    id: 'LS_WORK_smoke_free_mindset.mp3',
    source: `lifesaver/LS_WORK_smoke_free_mindset_${lang}.mp3`,
    only: [LIFESAVER_PLACES.WORK],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_WORK_smoke_free_mindset'),
    new: true,
  },
  {
    id: 'LS_WORK_superhero_power_poses.mp3',
    source: `lifesaver/LS_WORK_superhero_power_poses_${lang}.mp3`,
    only: [LIFESAVER_PLACES.WORK],
    type: 'audio',
    category: 'practical',
    title: translate('contents.LifeSaverAudios.LS_WORK_superhero_power_poses'),
    new: true,
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
    new: false,
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
    new: false,
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
    new: false,
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
    new: false,
  },
  {
    id: 'fact-2-nicotine-I',
    free: true,
    type: 'text',
    category: 'learning',
    contentCategory: 'fact',
    title: translate('contents.readFactNicotine1.title'),
    new: false,
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
    new: false,
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
    new: false,
  },
]
