import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ReactChild, ReactChildren, ReactElement, ReactNode } from 'react'
import { companyType, placeType, urgeType } from './src/screens/Lifesaver/storage'
import { LifesaverAudioType, LifesaverReadType, LifesaverDoType } from './src/utils/lifesaverActivities'

export type LifesaverContentType = {
  id: string
  type: ContentTypesType
  category: 'practical' | 'learning'
  free?: boolean
} & Record<string, unknown>

export type RootStackParamList = {
  Landing: undefined
  LoginPhone: undefined
  LoginEmail: undefined
  ValidationLoginPhone: {
    phoneNumber: string
  }
  ValidationLoginEmail: {
    email: string
  }
  SupportRegister: undefined
  Onboarding: undefined
  Main: undefined
  Home: undefined
  Registration: undefined
  KitActivationLanding: undefined
  Login: undefined
  ForgotPassword: undefined
  ThemeInspector: undefined
  KitWelcome: undefined
  LoginCode: { email: string } | { eid: string }
  KitPresentation: { demoVr: boolean }
  StressRate: { isTrigerIdentification: boolean } | undefined
  StressTrigger: { isTrigerIdentification: boolean }
  StressActivityType: undefined
  Activity: { activityId: string } | undefined
  AuthByToken: { token: string } | undefined
  SmokeModal: undefined
  QuitDayModal: undefined
  QuitDayModalProfile: undefined
  Tutorial: undefined
  KitActivation: undefined
  AboutVR: undefined
  StressActivitySelect: undefined
  ReadActivitySelect: undefined
  StressActivityToDo: {
    type?: string
    isFromPlayground?: boolean
    selectedContent?: LifesaverContentType
  }
  BasicModal: {
    content: (props: { close: () => Promise<void> }) => React.ReactNode
  }
  VRMet: {
    assetUrl: string
    onCancel: () => void
    onComplete: () => void
    useUrl?: boolean
  }
  Playground: { only?: string; urge: urgeType; place: placeType; company: companyType }
  Zoho: {
    zohoUrl: string
    onCancel: () => void
    onComplete: () => void
    customData?: Record<string, unknown>
  }
  Support: undefined
  Messages: undefined
  PathEnding: {
    header: {
      type: string
      asset: string
    }
    body: {
      options: string[]
    }
  }
  Profile: undefined
  ProfileUser: undefined
  Program: undefined
  Statistics: undefined
  HowItWorks: undefined
  VRDemo: undefined
  KitAssemble: undefined
  Library: undefined
  ContentsShelf: { category: ProgramActivityCategories }
  Roadmap: undefined
  VRPlaygroundActivity: { url: string }
  LifesaverActivity: {
    activity: LifesaverReadType | LifesaverAudioType | LifesaverDoType
    urge: urgeType
    place: placeType
    company: companyType
  }
  UpdateApp: undefined
  ValidationPhone: undefined
  ValidationPhoneCodeScreen: {
    phoneNumber: string
  }
}

export interface DefaultScreenPropType<Type extends keyof RootStackParamList> {
  navigation: StackNavigationProp<RootStackParamList, Type>
}
export interface DefaultScreenRouteType<RouteName extends keyof RootStackParamList> {
  route: RouteProp<RootStackParamList, RouteName>
}
export type ProgramActivityType = '2d-video' | 'vr-met' | 'audio' | 'reflection'
export type ProgramActivityCategories = 'mindfulness' | 'relaxation' | 'education'
export type ProgramActivity = {
  type: ProgramActivityType
  id: string
  name: string
  description: string
  asset: string
  duration: number | string
}

export type ProgramLevel = {
  id: number
  name: string
  message: string
  activities: ProgramActivity[]
}

export type ProgramType = {
  modules: {
    id: number
    name: string
    levels: ProgramLevel[]
  }[]
}

declare global {
  interface Window {
    firebase: any
  }
  interface Screen {
    readonly mozOrientation: string
    readonly msOrientation: string
    readonly availHeight: number
    readonly availWidth: number
    readonly colorDepth: number
    readonly height: number
    readonly orientation: ScreenOrientation
    readonly pixelDepth: number
    readonly width: number
  }
}

export type activityTypesType = '2d-video' | 'vr-met' | 'audio' | 'reflection'

export type activityType = {
  type?: activityTypesType
  id?: string
  name?: string
  description?: string
  asset?: string
  category?: string
  duration?: number
}

export type journalType = {
  activity_id: string
  date: FirebaseFirestoreTypes.Timestamp
  level: number
  reason: string
}
export type PathsType =
  | 'rate_stress'
  | 'daily_activity'
  | 'coach'
  | 'kit_activation'
  | 'about_vr'
  | 'learn'
  | 'statistics'
  | null

export type ContentTypesType = 'text' | 'activity' | 'audio'

export type AnalyticEventType = {
  path_ending: {
    path: PathsType
  }
  tutorial_begin: undefined
  tutorial_complete: undefined
  tutorial_drop: { step: number }
  video_start: {
    video_type: '2d' | 'vr'
    video_id: string
  }
  video_end: {
    video_type: '2d' | 'vr'
    video_id: string
  }
  select_content: {
    content_type: activityTypesType | ContentTypesType // Content type should be migrated to ts in order to put it here
    item_id: string
  }
  reliever_activity_do: undefined
  reliever_activity_read: undefined
  reliever_activity_listen: undefined
  reliever_activity_complete: undefined
  reliever_activity_drop: undefined
  ui_nav_close_btn_stats: undefined
  ui_nav_close_btn_read_act: undefined
}

const VR_SESSIONS_STATES = ['AWAITING', 'PERMISSIONS', 'INACTIVE'] as const

export type VR_SESSIONS_STATES_TYPE = typeof VR_SESSIONS_STATES[number]

export type activityOrigin = 'program' | 'lifesaver'

export type languagesType = 'en' | 'es'
