import analytics from '@react-native-firebase/analytics';
import { AnalyticEventType } from '../../types';

export const AnalyticEvent = async <T extends keyof AnalyticEventType>(
  event: T,
  eventArgument: AnalyticEventType[T],
): Promise<void> => {
  return await analytics().logEvent(event, eventArgument);
};
