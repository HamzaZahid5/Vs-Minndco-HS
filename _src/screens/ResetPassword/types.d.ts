import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

type ResetPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ResetPassword'>;

type Props = {
  navigation: ResetPasswordScreenNavigationProp;
};

export default Props;
