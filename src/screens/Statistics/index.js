import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';

import BigButton from '../../components/BigButton';
import ScreenDecorator from '../../components/ScreenDecorator';
import Carousel, { nextSlide } from '../../components/Carousel';
import TodayActivityStatus from './TodayActivityStatus';
import DailyActivityStreak from './DailyActivityStreak';
import CompletionChart from './CompletionChart';
import StressLevelsChart from './StressLevelsChart';
import AverageStressLevel from './AverageStressLevel';
import MostFrequentTriggers from './MostFrequentTriggers';
import { usePathEndingBarButton } from '../PathEnding';
import useJournal from '../../utils/hooks/useJournal';
import { triggerKeyToLabel } from '../StressTrigger';

const getFrequentTriggersFromJournal = (journal = []) => {
  const triggersWithScores = journal.reduce((r, item) => {
    if(!r.hasOwnProperty(item.reason)) {
      r[item.reason] = 0;
    }
    r[item.reason]++;
    return r;
  }, {});

  return Object.entries(triggersWithScores)
    .map(i => ({ label: triggerKeyToLabel(i[0]), count: i[1] }))
    .sort((a, b) => {
      if (a.count > b.count) return -1;
      if (a.count < b.count) return 1;
    });
};

export default ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const cRef = useRef();
  const journal = useJournal() || [];
  const frequentTriggers = getFrequentTriggersFromJournal(journal);
  const avgStressLevel = journal.reduce((r, i) => r + i.level, 0) / journal.length;
  const chartData = journal.map(r => r.level).reverse();

  usePathEndingBarButton(navigation, {
    routeParams: {
      header: {
        type: 'statistics',
      },
      body: {
        options: ['TutorialRow', 'CoachRow', 'StressManagementRow'],
      }
    }
  });
  
  return (
    <ScreenDecorator>
      <Carousel
        ref={cRef}
        items={[{
          // title: 'Constancy',
          content: (
            <>
              <View style={{ flex: 1 }}>
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
                <View style={{ position: 'absolute', bottom: -30, right: 5, width: '100%', alignItems: 'flex-end' }}>
                  <BigButton onPress={() => nextSlide(cRef)}>next</BigButton>
                </View>
              </View>
            </>
          ),
        }, {
          // title: 'Triggers',
          content: (
            <View style={{ flex: 1, height: '100%' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
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
            // <View style={{ flex: 1, height: '100%' }}>
            //   <Text style={{color: 'red'}}>Most frequent trigger: work</Text>
            //   <Text style={{color: 'red'}}>Average level: 8</Text>
            //   <Text style={{color: 'red'}}>last 10 records: __/---\___/-\_</Text>
            //   <View style={{ position: 'absolute', bottom: -40, width: '100%', alignItems: 'center' }}>
                
            //   </View>
            // </View>
          ),
        }]}
      />
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
