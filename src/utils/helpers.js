import { TIPS_VR, TIPS_VIDEO, TIPS_AUDIO } from './constants'
export const isFunction = f => typeof f === 'function';

export const getTipsByActivityType = type => {
  return {
    'vr-met': translate('screens.activity.tipsVR'),
    '2d-video': translate('screens.activity.tipsVideo'),
    audio: translate('screens.activity.tipsAudio'),
  }[type];
};

export const getIconByActivityType = type => {
  switch (type) {
    case 'vr-met':
      return 'google-cardboard';
    case 'reflection':
      return 'pencil';
    case '2d-video':
      return 'video';
    case 'audio':
      return 'headphones';
    default:
      return 'star';
  }
};