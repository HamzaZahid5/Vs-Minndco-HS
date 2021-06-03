import { StackNavigationProp } from '@react-navigation/stack';
import { ProgramActivityCategories, RootStackParamList } from '../../../types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ContentsShelf'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: {
    params: {
      category: ProgramActivityCategories;
    };
  };
};

export default Props;
