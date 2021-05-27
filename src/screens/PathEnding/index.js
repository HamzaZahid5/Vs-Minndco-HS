import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Button, Headline } from 'react-native-paper';
import { useSelector } from 'react-redux';
import moment from 'moment';
import GenericPageLayout from '../../components/GenericPageLayout';
import ScreenDecorator from '../../components/ScreenDecorator';
import RowItem from '../../components/RowItem';
import HeaderRating from './HeaderRating';
import HeaderStatistics from './HeaderStatistics';
import HeaderEmpty from './HeaderEmpty';
import HeaderPoll from './HeaderPoll';
import HeaderPerformance from './HeaderPerformance';
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';
import { LAST_ACTIVITY_AT } from '../../store/selectors';

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

const getHeaderByParam = param => {
  if (param.type === 'statistics') {
    return <HeaderStatistics />
  }
  if (param.type === 'performance') {
    return <HeaderPerformance />
  }
  if (param.type === 'rate') {
    return <HeaderRating asset={param.asset} />
  }
  if (param.type === 'vote') {
    return <HeaderVote asset={param.asset} />
  }
  if (param.type === 'mood_poll') {
    return <HeaderPoll asset={param.asset} />
  }
  return <HeaderEmpty />
}

export default ({ navigation, route }) => {
  const theme = useTheme();
  const lastActivityAt = useSelector(LAST_ACTIVITY_AT);
  const todaysActivityDone = moment(lastActivityAt).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
  const styles = getStyles(theme);
  const resetPathTo = useNavigationResetPathTo(navigation);
  const { header: headerParam, body: bodyParam } = route.params;
  let rowOptions = bodyParam?.options ?? [];
  if (!todaysActivityDone && !rowOptions.includes('DailyActivityRow')) {
    rowOptions.unshift('DailyActivityRow');
  }
  if (rowOptions.length > 3) {
    rowOptions = rowOptions.slice(0, 3);
  }

  const DailyActivityRow = <RowItem title="Do your daily activity" text="Ready to train?" reverse onPress={() => resetPathTo('Activity')}/>;
  const StressManagementRow = <RowItem title="Use the lifesaver" text="Feeling stressed?" reverse onPress={() => resetPathTo('StressRate')}/>;
  const StressManagementRowAgain = <RowItem title="Use the lifesaver again" text="Still feeling stressed?" reverse onPress={() => resetPathTo('StressRate')}/>;
  const CoachRow = <RowItem title="Message your coach" text="Looking for some advises?" reverse onPress={() => resetPathTo('Support')}/>;
  const TutorialRow = <RowItem title="See the app tutorial" text="Want to review the app features?" reverse onPress={() => resetPathTo('')}/>;
  const VRDemoRow = <RowItem title="Take the first VR experience" text="Ready to try VR?" reverse onPress={() => resetPathTo('')}/>;
  const ViewerAssembleRow = <RowItem title="How to assemble my VR headset" text="Get ready for VR" reverse onPress={() => resetPathTo('')}/>;
  const StatsRow = <RowItem title="See your performance" text="Willing to know you better?" reverse onPress={() => resetPathTo('Statistics')}/>;
  const LearnRow = <RowItem title="Let's visit the library" text="Ready to learn about stress?" reverse onPress={() => resetPathTo('')}/>;

  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        header={getHeaderByParam(headerParam)}
      >
        <Headline style={styles.bodyTitle}>What's next?</Headline>
        <View style={styles.bodyContainer}>
          {rowOptions.includes('DailyActivityRow') && DailyActivityRow}
          {rowOptions.includes('LearnRow') && LearnRow}
          {rowOptions.includes('StatsRow') && StatsRow}
          {rowOptions.includes('StressManagementRow') && StressManagementRow}
          {rowOptions.includes('StressManagementRowAgain') && StressManagementRowAgain}
          {rowOptions.includes('CoachRow') && CoachRow}
          {rowOptions.includes('TutorialRow') && TutorialRow}
          {rowOptions.includes('VRDemoRow') && VRDemoRow}
          {rowOptions.includes('ViewerAssembleRow') && ViewerAssembleRow}
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
