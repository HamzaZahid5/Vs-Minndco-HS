import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ days }) => {
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
        Frequent triggers
      </Paragraph>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Paragraph style={{ ...theme.fonts.heading1, fontSize: 50, lineHeight: 50, }}>
          { days }
        </Paragraph>
        <Paragraph style={{ ...theme.fonts.regular }}>
          { days === 1 ? 'day' : 'days' }
        </Paragraph>
      </View>
    </View>
  );
};
