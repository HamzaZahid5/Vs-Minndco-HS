import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp & { openDrawer: FunctionConstructor };
};

export default Props;
