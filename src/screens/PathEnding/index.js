import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Button, Headline } from 'react-native-paper';
import Color from 'color';
import GenericPageLayout from '../../components/GenericPageLayout';
import ScreenDecorator from '../../components/ScreenDecorator';
import RowItem from '../../components/RowItem';
import HeaderRating from './HeaderRating';
import HeaderStatistics from './HeaderStatistics';
import HeaderEmpty from './HeaderEmpty';
import HeaderPoll from './HeaderPoll';
import HeaderVote from './HeaderVote';
import HeaderPerformance from './HeaderPerformance';
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';
import useTodaysActivityDone from '../../utils/hooks/useTodaysActivityDone';
import ChipButton from '../../components/ChipButton';

export const usePathEndingBarButton = (navigation, { text = 'Done', routeParams = {} } = {}) => {
  const resetTo = useNavigationResetPathTo(navigation);
  const theme = useTheme();
  useLayoutEffect(() => {
    const headerRight = () => (
      <ChipButton
        onPress={() => resetTo('PathEnding', routeParams)}
        labelStyle={{
          color: Color(theme.colors.dark).darken(0.3).toString(),
          lineHeight: 10,
          marginTop: 7,
          fontFamiliy: 'Graphik-Bold',
        }}
        style={{
          backgroundColor: 'transparent',
          marginHorizontal: 10,
          borderWidth: 2,
          borderColor: Color(theme.colors.dark).darken(0.3).toString(),
        }}
      >
        {text}
      </ChipButton>
    );
    navigation.setOptions({
      headerRight,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, routeParams]);
};

const getHeaderByParam = param => {
  if (param.type === 'statistics') {
    return <HeaderStatistics />;
  }
  if (param.type === 'performance') {
    return <HeaderPerformance />;
  }
  if (param.type === 'rate') {
    return <HeaderRating asset={param.asset} />;
  }
  if (param.type === 'vote') {
    return <HeaderVote asset={param.asset} />;
  }
  if (param.type === 'mood_poll') {
    return <HeaderPoll asset={param.asset} />;
  }
  return <HeaderEmpty />;
};

const PathEnding = ({ navigation, route }) => {
  const theme = useTheme();
  const todaysActivityDone = useTodaysActivityDone();
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

  const DailyActivityRow = (
    <RowItem title="Do your daily activity" text="Ready to train?" reverse onPress={() => resetPathTo('Activity')} />
  );
  const StressManagementRow = (
    <RowItem title="Use the reliever" text="Feeling stressed?" reverse onPress={() => resetPathTo('StressRate')} />
  );
  const StressManagementRowAgain = (
    <RowItem
      title="Use the reliever again"
      text="Still feeling stressed?"
      reverse
      onPress={() => resetPathTo('StressRate')}
    />
  );
  const CoachRow = (
    <RowItem
      title="Message your coach"
      text="Looking for some advises?"
      reverse
      onPress={() => resetPathTo('Support')}
    />
  );
  const TutorialRow = (
    <RowItem
      title="See the app tutorial"
      text="Want to review the app features?"
      reverse
      onPress={() => resetPathTo('Tutorial')}
    />
  );
  const HowToProgram = (
    <RowItem
      title="Check out the program overview"
      text="Wondering how this work?"
      reverse
      onPress={() => resetPathTo('HowItWorks')}
    />
  );
  const VRDemoRow = (
    <RowItem
      title="Take the first VR experience"
      text="Ready to try VR?"
      reverse
      onPress={() => resetPathTo('VRDemo')}
    />
  );
  const ViewerAssembleRow = (
    <RowItem
      title="How to assemble my VR headset"
      text="Get ready for VR"
      reverse
      onPress={() => resetPathTo('KitAssemble')}
    />
  );
  const StatsRow = (
    <RowItem
      title="See your performance"
      text="Willing to know you better?"
      reverse
      onPress={() => resetPathTo('Statistics')}
    />
  );
  const LearnRow = (
    <RowItem
      title="Let's visit the library"
      text="Ready to learn everything about stress?"
      reverse
      onPress={() => resetPathTo('Library')}
    />
  );

  return (
    <ScreenDecorator>
      <GenericPageLayout fullScroll header={getHeaderByParam(headerParam)}>
        <Headline style={styles.bodyTitle}>{"What's next?"}</Headline>
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
          {rowOptions.includes('HowToProgram') && HowToProgram}
        </View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

PathEnding.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default PathEnding;

const getStyles = theme =>
  StyleSheet.create({
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
      ...theme.fontsHelper.heading2,
      color: theme.colors.dark,
    },
  });
