import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { LAST_ACTIVITY_AT } from '../../store/selectors';

export default () => {
  const theme = useTheme();
  const lastActivityAt = useSelector(LAST_ACTIVITY_AT);
  const todaysActivityDone = moment(lastActivityAt).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
  return (
    <View style={{
      backgroundColor: 'white',
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
      <Paragraph style={{ ...theme.fonts.heading2, fontSize: 20 }}>
        Daily activity
      </Paragraph>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name={ todaysActivityDone ? "progress-check" : "progress-alert" } size={60} color="#F79337" />
        <Paragraph style={{ ...theme.fonts.regular }}>
          { todaysActivityDone ? 'done!' : 'pending...' }
        </Paragraph>
      </View>
    </View>
  );
};
