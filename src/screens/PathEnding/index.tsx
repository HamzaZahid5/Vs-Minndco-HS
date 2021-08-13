import React, { useLayoutEffect } from 'react';
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
import HeaderPerformance from './HeaderPerformance';
// @ts-ignore: non-ts file
import useNavigationResetPathTo from '../../utils/hooks/useNavigationResetPathTo';
// @ts-ignore: non-ts file
import useTodaysActivityDone from '../../utils/hooks/useTodaysActivityDone';
// @ts-ignore: non-ts file
import ChipButton from '../../components/ChipButton';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { DefaultScreenPropType, DefaultScreenRouteType, RootStackParamList } from '../../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { translate } from '../../utils/localization';

export const usePathEndingBarButton = (
  navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>,
  { text = 'Done', routeParams = {} } = {},
) => {
  const resetTo = useNavigationResetPathTo(navigation);
  const theme = useTheme() as CustomThemeType;
  useLayoutEffect(() => {
    const headerRight = () => (
      <ChipButton
        onPress={() => resetTo('PathEnding', routeParams)}
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
  let rowOptions = bodyParam?.options ?? [];
  if (!todaysActivityDone && !rowOptions.includes('DailyActivityRow')) {
    rowOptions.unshift('DailyActivityRow');
  }
  if (rowOptions.length > 3) {
    rowOptions = rowOptions.slice(0, 3);
  }

  const DailyActivityRow = (
    <RowItem
      title={translate('Do your daily activity')}
      text={translate('Ready to train?')}
      reverse
      onPress={() => resetPathTo('Activity')}
    />
  );
  const StressManagementRow = (
    <RowItem
      title={translate('Use the reliever')}
      text={translate('Feeling stressed?')}
      reverse
      onPress={() => resetPathTo('StressRate')}
    />
  );
  const StressManagementRowAgain = (
    <RowItem
      title={translate('Use the reliever again')}
      text={translate('Still feeling stressed?')}
      reverse
      onPress={() => resetPathTo('StressRate')}
    />
  );
  const CoachRow = (
    <RowItem
      title={translate('Message your coach')}
      text={translate('Looking for some advises?')}
      reverse
      onPress={() => resetPathTo('Support')}
    />
  );
  const TutorialRow = (
    <RowItem
      title={translate('See the app tutorial')}
      text={translate('Want to review the app features?')}
      reverse
      onPress={() => resetPathTo('Tutorial')}
    />
  );
  const HowToProgram = (
    <RowItem
      title={translate('Check out the program overview')}
      text={translate('Wondering how this work?')}
      reverse
      onPress={() => resetPathTo('HowItWorks')}
    />
  );
  const VRDemoRow = (
    <RowItem
      title={translate('Take the first VR experience')}
      text={translate('Ready to try VR?')}
      reverse
      onPress={() => resetPathTo('VRDemo')}
    />
  );
  const ViewerAssembleRow = (
    <RowItem
      title={translate('How to assemble my VR headset')}
      text={translate('Get ready for VR')}
      reverse
      onPress={() => resetPathTo('KitAssemble')}
    />
  );
  const StatsRow = (
    <RowItem
      title={translate('See your performance')}
      text={translate('Willing to know you better?')}
      reverse
      onPress={() => resetPathTo('Statistics')}
    />
  );
  const LearnRow = (
    <RowItem
      title={translate("Let's visit the library")}
      text={translate('Ready to learn everything about stress?')}
      reverse
      onPress={() => resetPathTo('Library')}
    />
  );

  return (
    <ScreenDecorator>
      <GenericPageLayout fullScroll header={getHeaderByParam(headerParam)}>
        <Headline style={styles.bodyTitle}>{translate("What's next?")}</Headline>
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
