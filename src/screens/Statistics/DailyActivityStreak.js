import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import Color from 'color';
import { useSelector } from 'react-redux';
import { ACTIVITY_DAYS_IN_A_ROW } from '../../store/selectors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ days }) => {
  const theme = useTheme();
  const streakCount = useSelector(ACTIVITY_DAYS_IN_A_ROW);
  return (
    <View style={{
      backgroundColor: Color('#F79337').lighten(0).toString(),
      borderRadius: 24,
      padding: 14,
      height: '100%',
      justifyContent: 'flex-start',
      shadowColor: '#664AB9',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 2
    }}>
      <Paragraph style={{ ...theme.fonts.heading2, fontSize: 20, color: 'white' }}>
        Habit
      </Paragraph>
      {streakCount === 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Paragraph style={{ ...theme.fonts.regular, color: 'white' }}>
            Preform one activity a day to make it a habit
          </Paragraph>
        </View>
      )}
      {streakCount !== 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Paragraph style={{ ...theme.fonts.heading1, fontSize: 50, lineHeight: 50, color: 'white' }}>
            { streakCount }
          </Paragraph>
          <Paragraph style={{ ...theme.fonts.regular, color: 'white' }}>
            { streakCount === 1 ? 'day' : 'days' }
          </Paragraph>
        </View>
      )}
    </View>
  );
};
