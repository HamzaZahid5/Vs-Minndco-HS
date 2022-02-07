/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
// @ts-ignore: non-ts file
import { getLogStressSurveyData } from '../../services/Firestore';
import { triggerKeyToLabel } from '../StressTrigger';
import { journalType } from '../../../types';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { DefaultScreenPropType } from '../../../types';
import { translate } from '../../utils/localization';
import useOrientationLocker from '../../utils/hooks/useOrientationLocker';
import { OrientationLock } from 'expo-screen-orientation';
import AnalyticEvent from '../../utils/AnalyticsEvent';
import useStartPath from '../../utils/hooks/useStartPath';
import { useSelector } from 'react-redux';
import { AVERAGE_STRESS } from '../../store/selectors';

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
  const avgStressLevel = useSelector(AVERAGE_STRESS);
  const [chartData, setChartData] = useState<number[]>([]);
  useStartPath('statistics');
  usePathEndingBarButton(
    navigation,
    {
      routeParams: {
        header: {
          type: 'statistics',
        },
        body: {
          options: ['TutorialRow', 'CoachRow', 'StressManagementRow'],
        },
      },
    },
    () => AnalyticEvent('ui_nav_close_btn_stats'),
  );
  const getStressRate = useCallback(async () => {
    const logData = await getLogStressSurveyData();
    if (logData.size) {
      const values: number[] = [];
      logData.forEach((log: Record<string, any>) => {
        const value = Number(JSON.parse(log.data().value));
        values.push(value);
      });
      setChartData(values.reverse());
    }
  }, []);
  useEffect(() => {
    getStressRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                    <AverageStressLevel level={avgStressLevel ?? 0} />
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
