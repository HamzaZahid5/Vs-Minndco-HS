export type RootStackParamList = {
  Main: undefined;
  Home: undefined;
  Registration: undefined;
  Login: undefined;
  ThemeInspector: undefined;
  StressRate: undefined;
  StressTrigger: undefined;
  StressActivityType: undefined;
  Activity: undefined;
  Modal: undefined;
  Tutorial: undefined;
  KitActivation: undefined;
  AboutVR: undefined;
  StressActivityToDo: undefined;
  VRMet: undefined;
  Support: undefined;
  PathEnding: undefined;
  Profile: undefined;
  Statistics: undefined;
  HowItWorks: undefined;
  VRDemo: undefined;
  KitAssemble: undefined;
  Library: undefined;
  ContentsShelf: { category: ProgramActivityCategories };
};

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
}
