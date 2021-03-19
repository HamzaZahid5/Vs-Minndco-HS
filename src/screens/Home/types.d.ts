import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types'

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default Props;
