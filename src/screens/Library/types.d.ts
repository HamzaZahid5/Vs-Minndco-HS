import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Library'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default Props;
