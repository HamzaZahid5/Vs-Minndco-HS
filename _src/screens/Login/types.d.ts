import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default Props;
