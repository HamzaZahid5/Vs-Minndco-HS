import analytics from '@react-native-firebase/analytics';
import { AnalyticEventType } from '../../types';

const AnalyticEvent = async <T extends keyof AnalyticEventType>(
  event: T,
  eventArgument?: AnalyticEventType[T],
): Promise<void> => {
  return await analytics().logEvent(event, eventArgument);
};

export default AnalyticEvent;
