/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import BigButton from '../../components/BigButton';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
// @ts-ignore: non-ts file
import Carousel, { nextSlide } from '../../components/Carousel';
import TodayActivityStatus from './TodayActivityStatus';
import DailyActivityStreak from './DailyActivityStreak';
import CompletionChart from './CompletionChart';
import StressLevelsChart from './StressLevelsChart';
import AverageStressLevel from './AverageStressLevel';
import MostFrequentTriggers from './MostFrequentTriggers';
import { usePathEndingBarButton } from '../PathEnding';
// @ts-ignore: non-ts file
import useJournal from '../../utils/hooks/useJournal';
import { triggerKeyToLabel } from '../StressTrigger';
import { journalType } from '../../../types';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { DefaultScreenPropType } from '../../../types';
import { translate } from '../../utils/localization';
import useOrientationLocker from '../../utils/hooks/useOrientationLocker';
import { OrientationLock } from 'expo-screen-orientation';

const getFrequentTriggersFromJournal = (journal: journalType[] = []) => {
  const triggersWithScores = journal.reduce((r, item) => {
    if (!r.hasOwnProperty(item.reason)) {
      r[item.reason] = 0;
    }
    r[item.reason]++;
    return r;
  }, {} as Record<string, number>);

  return Object.entries(triggersWithScores)
    .map(i => ({ label: triggerKeyToLabel(i[0]), count: i[1] }))
    .sort((a: { label: string; count: number }, b: { label: string; count: number }): number => {
      if (a.count > b.count) return -1;
      if (a.count < b.count) return 1;
      return 0;
    });
};

const Statistics = ({ navigation }: DefaultScreenPropType<'Statistics'>) => {
  const cRef = useRef();
  useOrientationLocker(OrientationLock.PORTRAIT_UP);
  const journal = useJournal() || [];
  const frequentTriggers = getFrequentTriggersFromJournal(journal);
  const avgStressLevel = journal.reduce((r: number, i: journalType) => r + i.level, 0) / Number(journal.length) || 0;
  const chartData = journal.map((r: journalType) => r.level).reverse();

  usePathEndingBarButton(navigation, {
    routeParams: {
      header: {
        type: 'statistics',
      },
      body: {
        options: ['TutorialRow', 'CoachRow', 'StressManagementRow'],
      },
    },
  });

  return (
    <ScreenDecorator>
      <Carousel
        ref={cRef}
        items={[
          {
            content: (
              <>
                <View style={{ flex: 1, paddingHorizontal: 20 }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, padding: 10 }}>
                      <TodayActivityStatus />
                    </View>
                    <View style={{ flex: 1, padding: 10 }}>
                      <DailyActivityStreak />
                    </View>
                  </View>
                  <View style={{ flex: 1, minWidth: '100%', padding: 10, alignItems: 'center' }}>
                    <CompletionChart />
                  </View>
                  <View style={{ position: 'absolute', bottom: -30, right: 25, width: '100%', alignItems: 'flex-end' }}>
                    <BigButton onPress={() => nextSlide(cRef)}>{translate('screens.Statistics.next')}</BigButton>
                  </View>
                </View>
              </>
            ),
          },
          {
            content: (
              <View style={{ flex: 1, height: '100%' }}>
                <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20 }}>
                  <View style={{ flex: 1, padding: 10 }}>
                    <MostFrequentTriggers triggers={frequentTriggers.map(t => t.label)} />
                  </View>
                  <View style={{ flex: 1, padding: 10 }}>
                    <AverageStressLevel level={avgStressLevel} />
                  </View>
                </View>
                <View style={{ flex: 1, padding: 10 }}>
                  <StressLevelsChart data={chartData} />
                </View>
                <View style={{ position: 'absolute', bottom: -40, width: '100%', alignItems: 'center' }}>
                  {/* <BigButton onPress={() => navigation.dispatch(StackActions.replace('PathEnding'))}>finish</BigButton> */}
                </View>
              </View>
            ),
          },
        ]}
      />
    </ScreenDecorator>
  );
};

Statistics.propTypes = {
  navigation: PropTypes.object,
};

export default Statistics;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    hero: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bodyContainer: {
      // backgroundColor: '#f00a',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    bodyTitle: {
      ...theme.fonts.heading2,
      color: theme.colors.dark,
    },
  });
