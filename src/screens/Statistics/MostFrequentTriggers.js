import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from 'color';

const MostFrequentTriggers = ({ triggers }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: Color('#87B1E3').lighten(0).toString(),
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
      <Paragraph style={{ fontSize: 20 }}>Frequent triggers</Paragraph>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {triggers[0] && (
          <Paragraph style={{ ...theme.fontsHelper.heading1, fontSize: 15, lineHeight: 20 }}>{triggers[0]}</Paragraph>
        )}
        {triggers[1] && (
          <Paragraph style={{ ...theme.fontsHelper.heading1, fontSize: 15, lineHeight: 20 }}>{triggers[1]}</Paragraph>
        )}
        {triggers[2] && (
          <Paragraph style={{ ...theme.fontsHelper.heading1, fontSize: 15, lineHeight: 20 }}>{triggers[2]}</Paragraph>
        )}
      </View>
    </View>
  );
};

MostFrequentTriggers.propTypes = {
  triggers: PropTypes.array,
};

export default MostFrequentTriggers;
