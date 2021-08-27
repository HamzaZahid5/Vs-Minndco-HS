import { translate } from './localization';
export const TIPS_VR = () => translate('screens.Activity.tipsVr');
export const TIPS_VIDEO = () => translate('screens.Activity.tipsVideo');
export const TIPS_AUDIO = () => translate('screens.Activity.tipsAudio');

export const ANALYTICS_EVENTS = {
  FUNNEL_LOGIN: 'funnel_login',
  FUNNEL_REGISTER_ENTER: 'funnel_registration_enter',
  FUNNEL_REGISTER_COMPLETE: 'funnel_registration_complete',
  FUNNEL_ONBOARD_COMPLETE: 'funnel_onboarding_complete',
  FUNNEL_WIZARD_FINISH: 'funnel_tutorial_complete',
  FUNNEL_WIZARD_ABORT: 'funnel_tutorial_cancel',
};

export const ACTIVITIES_TYPES = {
  text: 'text',
  audio: 'audio',
  activity: 'activity',
};

export const LIFESAVER_ACTIVITIES = [
  {
    id: 'breath-sync',
    free: true,
    type: ACTIVITIES_TYPES.activity,
  },
  {
    id: 'deep-breath-sync',
    free: true,
    type: ACTIVITIES_TYPES.activity,
  },
  {
    id: 'bubbles-wrapper',
    type: ACTIVITIES_TYPES.activity,
  },
];

export const LIFESAVER_AUDIOS = [
  {
    id: 'LS_HOME_calm_en.mp3',
    title: 'Calm',
    source: 'lifesaver/LS_HOME_calm_en.mp3',
    type: ACTIVITIES_TYPES.audio,
  },
  {
    id: 'LS_HOME_body_scan_with_nature_en.mp3',
    title: 'Body scan',
    source: 'lifesaver/LS_HOME_body_scan_with_nature_en.mp3',
    type: ACTIVITIES_TYPES.audio,
  },
  {
    id: 'LS_WORK_visualization_en.mp3',
    title: 'Visualization',
    source: 'lifesaver/LS_WORK_visualization_en.mp3',
    type: ACTIVITIES_TYPES.audio,
  },
  {
    id: 'LS_PARTY_move_your_attention_en.mp3',
    title: 'Move your attention',
    source: 'lifesaver/LS_PARTY_move_your_attention_en.mp3',
    type: ACTIVITIES_TYPES.audio,
  },
  {
    id: 'LS_OTHER_love_en.mp3',
    title: 'Love',
    source: 'lifesaver/LS_OTHER_love_en.mp3',
    type: ACTIVITIES_TYPES.audio,
  },
  {
    id: 'LS_WORK_calm_en.mp3',
    title: 'Calm',
    source: 'lifesaver/LS_WORK_calm_en.mp3',
    type: ACTIVITIES_TYPES.audio,
  },
  {
    id: 'LS_STREET_breath_en.mp3',
    title: 'Breath',
    source: 'lifesaver/LS_STREET_breath_en.mp3',
    type: ACTIVITIES_TYPES.audio,
  },
  {
    id: 'LS_WORK_positive_perspective_en.mp3',
    title: 'Perspective',
    source: 'lifesaver/LS_WORK_positive_perspective_en.mp3',
    type: ACTIVITIES_TYPES.audio,
  },
  {
    id: 'LS_STREET_pause_en.mp3',
    title: 'Pause',
    source: 'lifesaver/LS_STREET_pause_en.mp3',
    type: ACTIVITIES_TYPES.audio,
  },
  {
    id: 'LS_HOME_compassion.mp3',
    title: 'Compassion',
    source: 'lifesaver/LS_HOME_compassion_en.mp3',
    type: ACTIVITIES_TYPES.audio,
  },
];

export const LIFESAVER_READS = () => [
  {
    id: 'laugh-it-out',
    free: true,
    // type: 'read-to-do',
    title: 'Laugh it out / Smile wide',
    type: ACTIVITIES_TYPES.text,
    pages: [
      translate('contents.LIFESAVER_READS.laugh-it-out-1'),
      translate('contents.LIFESAVER_READS.laugh-it-out-2'),
      translate('contents.LIFESAVER_READS.laugh-it-out-3'),
    ],
  },
  {
    id: 'safe-activity',
    free: true,
    // type: 'read-to-do',
    title: 'S.A.F.E. activity',
    type: ACTIVITIES_TYPES.text,
    pages: [
      translate('contents.LIFESAVER_READS.safe-activity-1'),
      translate('contents.LIFESAVER_READS.safe-activity-2'),
      translate('contents.LIFESAVER_READS.safe-activity-3'),
    ],
  },
  {
    id: 'connect-with-nature',
    free: true,
    // type: 'read-to-do',
    title: 'Connect with nature',
    type: ACTIVITIES_TYPES.text,
    pages: [
      translate('contents.LIFESAVER_READS.connect-with-nature-1'),
      translate('contents.LIFESAVER_READS.connect-with-nature-2'),
      translate('contents.LIFESAVER_READS.connect-with-nature-3'),
    ],
  },
  {
    id: 'take-deep-breaths',
    free: true,
    // type: 'read-to-do',
    title: 'Take deep breaths',
    type: ACTIVITIES_TYPES.text,
    pages: [
      translate('contents.LIFESAVER_READS.take-deep-breaths-1'),
      translate('contents.LIFESAVER_READS.take-deep-breaths-2'),
      translate('contents.LIFESAVER_READS.take-deep-breaths-3'),
    ],
  },
  {
    id: 'calm-image',
    free: true,
    // type: 'read-to-do',
    title: 'Calm image',
    type: ACTIVITIES_TYPES.text,
    pages: [
      translate('contents.LIFESAVER_READS.calm-image-1'),
      translate('contents.LIFESAVER_READS.calm-image-2'),
      translate('contents.LIFESAVER_READS.calm-image-3'),
    ],
  },
  {
    id: 'relaxation',
    free: true,
    // type: 'read-to-do',
    title: 'Relaxation',
    type: ACTIVITIES_TYPES.text,
    pages: [translate('contents.LIFESAVER_READS.relaxation-1'), translate('contents.LIFESAVER_READS.relaxation-2')],
  },
];
