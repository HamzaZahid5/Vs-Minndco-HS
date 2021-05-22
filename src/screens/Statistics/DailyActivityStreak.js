import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ACTIVITY_DAYS_IN_A_ROW } from '../../store/selectors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ days }) => {
  const theme = useTheme();
  const streakCount = useSelector(ACTIVITY_DAYS_IN_A_ROW);
  return (
    <View style={{
      backgroundColor: 'lime',
      borderRadius: 24,
      padding: 14,
      height: '100%',
      justifyContent: 'flex-start',
    }}>
      <Paragraph style={{ ...theme.fonts.heading2, fontSize: 20 }}>
        Habit
      </Paragraph>
      {streakCount === 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Paragraph style={{ ...theme.fonts.regular }}>
            Preform one activity a day to make it a habit
          </Paragraph>
        </View>
      )}
      {streakCount !== 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Paragraph style={{ ...theme.fonts.heading1, fontSize: 50, lineHeight: 50, }}>
            { streakCount }
          </Paragraph>
          <Paragraph style={{ ...theme.fonts.regular }}>
            { streakCount === 1 ? 'day' : 'days' }
          </Paragraph>
        </View>
      )}
    </View>
  );
};
