import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes, { string } from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Button, Headline } from 'react-native-paper';
import Color from 'color';
// @ts-ignore: non-ts file
import GenericPageLayout from '../../components/GenericPageLayout';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
// @ts-ignore: non-ts file
import RowItem from '../../components/RowItem';
import HeaderRating from './HeaderRating';
import HeaderStatistics from './HeaderStatistics';
import HeaderEmpty from './HeaderEmpty';
import HeaderPoll from './HeaderPoll';
import HeaderVote from './HeaderVote';
import HeaderStressInfo from './HeaderStressInfo';
import HeaderPerformance from './HeaderPerformance';
// @ts-ignore: non-ts file
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';
// @ts-ignore: non-ts file
import useNextActivity from '../../utils/hooks/useNextActivity';
// @ts-ignore: non-ts file
import useTodaysActivityDone from '../../utils/hooks/useTodaysActivityDone';
// @ts-ignore: non-ts file
import ChipButton from '../../components/ChipButton';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { DefaultScreenPropType, DefaultScreenRouteType, PathsType, RootStackParamList } from '../../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { translate } from '../../utils/localization';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_PATH } from '../../store/selectors';
import AnalyticEvent from '../../utils/AnalyticsEvent';

export const usePathEndingBarButton = (
  navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>,
  { text = '', routeParams = {} } = {},
  onButtonPressed?: () => void,
) => {
  const buttonText = text.length ? text : translate('screens.PathEnding.done');
  const resetTo = useNavigationResetPathTo(navigation);
  const theme = useTheme() as CustomThemeType;
  useLayoutEffect(() => {
    const headerRight = () => (
      <ChipButton
        onPress={() => {
          if (onButtonPressed) onButtonPressed();
          resetTo('PathEnding', routeParams);
        }}
        labelStyle={{
          color: Color(theme.colors.dark).darken(0.3).toString(),
          lineHeight: 10,
          marginTop: 7,
          fontFamily: 'Graphik-Bold',
        }}
        style={{
          backgroundColor: 'transparent',
          marginHorizontal: 10,
          borderWidth: 2,
          borderColor: Color(theme.colors.dark).darken(0.3).toString(),
        }}
        testID="path-endind-button"
      >
        {buttonText}
      </ChipButton>
    );
    navigation.setOptions({
      headerRight,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, routeParams]);
};

const getHeaderByParam = (param: RootStackParamList['PathEnding']['header']) => {
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
  if (param.type === 'stress_info') {
    return <HeaderStressInfo />;
  }
  return <HeaderEmpty />;
};

const PathEnding = ({
  navigation,
  route,
}: DefaultScreenPropType<'PathEnding'> & DefaultScreenRouteType<'PathEnding'>) => {
  const theme = useTheme() as CustomThemeType;
  const todaysActivityDone = useTodaysActivityDone();
  const styles = getStyles(theme);
  const resetPathTo = useNavigationResetPathTo(navigation);
  const { header: headerParam, body: bodyParam } = route.params;
  const { isLastActivity } = useNextActivity();
  const [rowOptions, setRowOptions] = useState(bodyParam?.options ?? []);
  const dispatch = useDispatch();
  const current_path = useSelector(CURRENT_PATH);
  useEffect(() => {
    if (
      !todaysActivityDone &&
      !rowOptions.includes('DailyActivityRow') &&
      /* do not replace the strict comparison of false, isLastActivity can be undefined while hook resolve its state */
      isLastActivity === false
    ) {
      setRowOptions(['DailyActivityRow', ...rowOptions]);
    }
    if (rowOptions.length > 3) {
      setRowOptions(rowOptions.slice(0, 3));
    }
    if (current_path !== null) {
      AnalyticEvent('path_ending', { path: current_path as PathsType });
      dispatch({ type: 'flags/resetCurrentPath' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLastActivity, rowOptions, todaysActivityDone]);

  const DailyActivityRow = (
    <RowItem
      title={translate('screens.PathEnding.do-your-daily-activity')}
      text={translate('screens.PathEnding.ready-to-train')}
      reverse
      onPress={() => resetPathTo('Activity')}
    />
  );
  const StressManagementRow = (
    <RowItem
      title={translate('screens.PathEnding.use-the-reliever')}
      text={translate('screens.PathEnding.feeling-stressed')}
      reverse
      onPress={() => resetPathTo('StressTrigger')}
    />
  );
  const StressManagementRowAgain = (
    <RowItem
      title={translate('screens.PathEnding.use-the-reliever-again')}
      text={translate('screens.PathEnding.still-feeling-stressed')}
      reverse
      onPress={() => resetPathTo('StressTrigger')}
    />
  );
  const CoachRow = (
    <RowItem
      title={translate('screens.PathEnding.message-your-coach')}
      text={translate('screens.PathEnding.looking-for-some-advises')}
      reverse
      onPress={() => resetPathTo('Support')}
    />
  );
  const TutorialRow = (
    <RowItem
      title={translate('screens.PathEnding.see-the-app-tutorial')}
      text={translate('screens.PathEnding.want-to-review-the-app-features')}
      reverse
      onPress={() => resetPathTo('Tutorial')}
    />
  );
  const HowToProgram = (
    <RowItem
      title={translate('screens.PathEnding.check-out-the-program-overview')}
      text={translate('screens.PathEnding.wondering-how-this-work')}
      reverse
      onPress={() => resetPathTo('HowItWorks')}
    />
  );
  const VRDemoRow = (
    <RowItem
      title={translate('screens.PathEnding.take-the-first-vr-experience')}
      text={translate('screens.PathEnding.ready-to-try-vr')}
      reverse
      onPress={() => resetPathTo('VRDemo')}
    />
  );
  const ViewerAssembleRow = (
    <RowItem
      title={translate('screens.PathEnding.how-to-assemble-my-vr-headset')}
      text={translate('screens.PathEnding.get-ready-for-vr')}
      reverse
      onPress={() => resetPathTo('KitAssemble')}
    />
  );
  const StatsRow = (
    <RowItem
      title={translate('screens.PathEnding.see-your-performance')}
      text={translate('screens.PathEnding.willing-to-know-you-better')}
      reverse
      onPress={() => resetPathTo('Statistics')}
    />
  );
  const LearnRow = (
    <RowItem
      title={translate('screens.PathEnding.lets-visit-the-library')}
      text={translate('screens.PathEnding.ready-to-learn-everything-about-stress')}
      reverse
      onPress={() => resetPathTo('Library')}
    />
  );

  const PlaygroundRow = (
    <RowItem
      title={translate('screens.PathEnding.row-playground-title')}
      text={translate('screens.PathEnding.row-playground-desc')}
      reverse
      onPress={() => resetPathTo('Playground')}
    />
  );

  return (
    <ScreenDecorator>
      <GenericPageLayout fullScroll header={getHeaderByParam(headerParam)}>
        <Headline style={styles.bodyTitle}>{translate('screens.PathEnding.whats-next')}</Headline>
        <View style={styles.bodyContainer}>
          {rowOptions.includes('DailyActivityRow') && DailyActivityRow}
          {rowOptions.includes('PlaygroundRow') && PlaygroundRow}
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

const getStyles = (theme: CustomThemeType) =>
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
