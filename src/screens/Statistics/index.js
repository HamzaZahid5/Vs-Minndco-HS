import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';

import BigButton from '../../components/BigButton';
import ScreenDecorator from '../../components/ScreenDecorator';
import Carousel, { nextSlide } from '../../components/Carousel';
import TodayActivityStatus from './TodayActivityStatus';
import DailyActivityStreak from './DailyActivityStreak';
import DailyActivityChart from './DailyActivityChart'
import StressLevelsChart from './StressLevelsChart'
import AverageStressLevel from './AverageStressLevel'
import MostFrequentTriggers from './MostFrequentTriggers'

export default ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const cRef = useRef()
  // useEffect(() => {
  //   if(cRef.current) {
  //     setTimeout(() => {
  //       console.log(cRef.current.currentIndex)
  //       nextSlide(cRef);
  //     }, 1000)
  //     setTimeout(() => {
  //       nextSlide(cRef);
  //     }, 2000)
      
  //   }
  // }, [cRef])
  
  return (
    <ScreenDecorator>
      <Carousel
        ref={cRef}
        items={[{
          // title: 'Constancy',
          content: (
            <View style={{ flex: 1, height: '100%' }}>
              <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#f00a' }}>
                <View style={{ flex: 1, backgroundColor: '#00fa', padding: 10 }}>
                  <TodayActivityStatus done={false} />
                </View>
                <View style={{ flex: 1, backgroundColor: '#000a', padding: 10 }}>
                  <DailyActivityStreak days={5} />
                </View>
              </View>
              <View style={{ flex: 1, backgroundColor: '#0f0a', padding: 10 }}>
                <DailyActivityChart />
              </View>
              <View style={{ position: 'absolute', bottom: -40, width: '100%', alignItems: 'center' }}>
                <BigButton onPress={() => nextSlide(cRef)}>next</BigButton>
              </View>
            </View>
          ),
        }, {
          // title: 'Triggers',
          content: (
            <View style={{ flex: 1, height: '100%' }}>
              <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#f00a' }}>
                <View style={{ flex: 1, backgroundColor: '#00fa', padding: 10 }}>
                  <MostFrequentTriggers triggers={['alcohol', 'work', 'other']} />
                </View>
                <View style={{ flex: 1, backgroundColor: '#000a', padding: 10 }}>
                  <AverageStressLevel level={5} />
                </View>
              </View>
              <View style={{ flex: 1, backgroundColor: '#0f0a', padding: 10 }}>
                <StressLevelsChart />
              </View>
              <View style={{ position: 'absolute', bottom: -40, width: '100%', alignItems: 'center' }}>
                <BigButton onPress={() => navigation.dispatch(StackActions.replace('PathEnding'))}>finish</BigButton>
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
