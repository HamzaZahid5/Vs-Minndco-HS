import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
//@ts-ignore not implemented
import firestore from './src/services/Firestore';

export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Registration: undefined;
  Login: undefined;
  ThemeInspector: undefined;
  StressRate: undefined;
  StressTrigger: undefined;
  StressActivityType: undefined;
  Activity: { activityId: string } | undefined;
  Modal: undefined;
  Tutorial: undefined;
  KitActivation: undefined;
  AboutVR: undefined;
  StressActivityToDo: undefined;
  VRMet: undefined;
  Support: undefined;
  PathEnding: {
    header: {
      type: string;
      asset: string;
    };
    body: {
      options: string[];
    };
  };
  Profile: undefined;
  Statistics: undefined;
  HowItWorks: undefined;
  VRDemo: undefined;
  KitAssemble: undefined;
  Library: undefined;
  ContentsShelf: { category: ProgramActivityCategories };
};
export interface DefaultScreenPropType<Type extends keyof RootStackParamList> {
  navigation: StackNavigationProp<RootStackParamList, Type>;
}
export interface DefaultScreenRouteType<RouteName extends keyof RootStackParamList> {
  route: RouteProp<RootStackParamList, RouteName>;
}
export type ProgramActivityType = '2d-video' | 'vr-met' | 'audio' | 'reflection';
export type ProgramActivityCategories = 'mindfulness' | 'relaxation' | 'education';
export type ProgramActivity = {
  type: ProgramActivityType;
  id: string;
  name: string;
  description: string;
  asset: string;
  category: ProgramActivityCategories;
  duration: number | string;
};

declare global {
  interface Window {
    firebase: any;
  }
  interface Screen {
    readonly mozOrientation: string;
    readonly msOrientation: string;
    readonly availHeight: number;
    readonly availWidth: number;
    readonly colorDepth: number;
    readonly height: number;
    readonly orientation: ScreenOrientation;
    readonly pixelDepth: number;
    readonly width: number;
  }
}

export type activityTypesType = '2d-video' | 'vr-met' | 'audio' | 'reflection';

export type activityType = {
  type?: activityTypesType;
  id?: string;
  name?: string;
  description?: string;
  asset?: string;
  category?: string;
  duration?: number;
};

export type journalType = {
  activity_id: string;
  date: firestore.Timestamp;
  level: number;
  reason: string;
};
