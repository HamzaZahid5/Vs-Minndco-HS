import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import GenericPageLayout from '../../components/GenericPageLayout';
import ScreenDecorator from '../../components/ScreenDecorator';
import Carousel from '../../components/Carousel';

export default () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <ScreenDecorator>
      <Carousel
        items={[{
          title: 'Constancy',
          content: (
            <View>
              <Text style={{color: 'red'}}>Todays activity: done</Text>
              <Text style={{color: 'red'}}>Current streak: 5 days</Text>
              <Text style={{color: 'red'}}>Longest streak: 15 days</Text>
            </View>
          ),
        }, {
          title: 'Triggers',
          content: (
            <View>
              <Text style={{color: 'red'}}>Most frequent trigger: work</Text>
              <Text style={{color: 'red'}}>Average level: 8</Text>
              <Text style={{color: 'red'}}>last 10 records: __/---\___/-\_</Text>
            </View>
          ),
        }, {
          title: 'Progress',
          content: (
            <View>
              <Text style={{color: 'red'}}>Daily Activities: 3/48</Text>
              <Text style={{color: 'red'}}>Progress: 6.25%</Text>
              <Text style={{color: 'red'}}>Use of LS in last 10 days: 14x</Text>
            </View>
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
