import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AverageStressLevel = ({ level }) => {
  const theme = useTheme();
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
        <Paragraph style={{ ...theme.fonts.heading1, fontSize: 50, lineHeight: 50 }}>{level}</Paragraph>
      </View>
    </View>
  );
};

AverageStressLevel.propTypes = {
  level: PropTypes.number,
};

export default AverageStressLevel;
