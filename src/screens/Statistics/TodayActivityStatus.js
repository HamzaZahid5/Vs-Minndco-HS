import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ done }) => {
  const theme = useTheme();
  return (
    <View style={{
      backgroundColor: 'lime',
      borderRadius: 24,
      padding: 14,
      height: '100%',
      justifyContent: 'flex-start',
    }}>
      <Paragraph style={{ ...theme.fonts.heading2, fontSize: 20 }}>
        Daily activity
      </Paragraph>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name={ done ? "progress-check" : "progress-alert" } size={60} color="yellow" />
        <Paragraph style={{ ...theme.fonts.regular }}>
          { done ? 'done!' : 'pending...' }
        </Paragraph>
      </View>
    </View>
  );
};
