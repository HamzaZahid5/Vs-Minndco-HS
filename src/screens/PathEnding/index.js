import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Button } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import GenericPageLayout from '../../components/GenericPageLayout';
import ScreenDecorator from '../../components/ScreenDecorator';
import RowItem from '../../components/RowItem';
import HearderPoll from './HeaderPoll';
import HeaderRating from './HeaderRating';
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';

export const usePathEndingBarButton = (navigation, { text = 'Done', routeParams = {} } = {}) => {
  const resetTo = useNavigationResetPathTo(navigation);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => resetTo('PathEnding', routeParams)}
          mode="text"
          color="white"
        >
          {text}
        </Button>
      ),
    });
  }, [navigation]);
}

export default ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const resetPathTo = useNavigationResetPathTo(navigation);

  const DailyActivityRow = <RowItem title="Do your daily activity" text="Ready to train?" reverse onPress={() => resetPathTo('Activity')}/>;
  const StressManagementRow = <RowItem title="Use the lifesaver" text="Feeling stressed?" reverse onPress={() => resetPathTo('')}/>;
  const StressManagementRowAgain = <RowItem title="Use the lifesaver again" text="Still feeling stressed?" reverse onPress={() => resetPathTo('')}/>;
  const CoachRow = <RowItem title="Message your coach" text="Looking for some advises?" reverse onPress={() => resetPathTo('')}/>;
  const TutorialRow = <RowItem title="See the app tutorial" text="Want to know the app features?" reverse onPress={() => resetPathTo('')}/>;
  const VRDemoRow = <RowItem title="Take the first VR experience" text="Ready to try VR?" reverse onPress={() => resetPathTo('')}/>;
  const ViewerAssembleRow = <RowItem title="How to assemble my VR headset" text="Get ready for VR" reverse onPress={() => resetPathTo('')}/>;
  const StatsRow = <RowItem title="See your performance" text="Willing to know you better?" reverse onPress={() => resetPathTo('Statistics')}/>;
  const LearnRow = <RowItem title="Let's visit the library" text="Ready to learn about stress?" reverse onPress={() => resetPathTo('')}/>;

  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        header={
          <HeaderRating />
        }
      >
        <Text style={styles.bodyTitle}>What's next?</Text>
        <View style={styles.bodyContainer}>
          {DailyActivityRow}
          {LearnRow}
          {StatsRow}
        </View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
}

const getStyles = theme => StyleSheet.create({
  hero: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    // backgroundColor: '#f00a',
    // minHeight: '100%',
    flexGrow: 1,
    margin: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bodyTitle: {
    ...theme.fonts.heading2,
    color: theme.colors.dark,
  },
});
