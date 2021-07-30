import { Paragraph, useTheme } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import React from 'react';

const AverageStressLevel = ({ level }) => {
  const theme = useTheme();
  const fixedLevel = Math.round(10 * level) / 10;
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 14,
        height: '100%',
        justifyContent: 'flex-start',
        shadowColor: '#664AB9',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      <Paragraph style={{ fontSize: 20 }}>Avg Stress Level</Paragraph>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {level === 0 && (
          <Paragraph style={{ ...theme.fonts.heading1, fontSize: 50, lineHeight: 50, color: '#0006' }}>-</Paragraph>
        )}
        {level !== 0 && (
          <Paragraph style={{ ...theme.fonts.heading1, fontSize: 50, lineHeight: 50 }}>{fixedLevel}</Paragraph>
        )}
      </View>
    </View>
  );
};

AverageStressLevel.propTypes = {
  level: PropTypes.number,
};

export default AverageStressLevel;
