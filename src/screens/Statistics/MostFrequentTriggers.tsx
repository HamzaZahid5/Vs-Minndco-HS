/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Color from 'color';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';

const MostFrequentTriggers = ({ triggers }: { triggers: string[] }) => {
  const theme = useTheme() as CustomThemeType;
  const bgColor = Color('#87B1E3').lighten(0).toString();
  const itemFGColor = Color(theme.colors.ligth).alpha(0.5).toString();
  return (
    <View
      style={{
        backgroundColor: bgColor,
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
      <Paragraph style={{ fontSize: 18, textAlign: 'left' }}>
        {translate('screens.Statistics.frequent-triggers')}
      </Paragraph>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {!triggers.length && (
          <Paragraph style={{ fontSize: 15, color: '#0006', textAlign: 'center' }}>
            {translate('screens.Statistics.no-triggers')}
          </Paragraph>
        )}
        {triggers[0] && (
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            colors={[bgColor, itemFGColor, itemFGColor, bgColor]}
            style={{
              width: '100%',
              minHeight: '20%',
              margin: 5,
              justifyContent: 'center',
            }}
          >
            <Paragraph style={{ fontSize: 15, textAlign: 'center' }}>{triggers[0]}</Paragraph>
          </LinearGradient>
        )}
        {triggers[1] && (
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            colors={[bgColor, itemFGColor, itemFGColor, bgColor]}
            style={{
              width: '100%',
              minHeight: '20%',
              margin: 5,
              justifyContent: 'center',
            }}
          >
            <Paragraph style={{ fontSize: 15, textAlign: 'center' }}>{triggers[1]}</Paragraph>
          </LinearGradient>
        )}
        {triggers[2] && (
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            colors={[bgColor, itemFGColor, itemFGColor, bgColor]}
            style={{
              width: '100%',
              minHeight: '20%',
              margin: 5,
              justifyContent: 'center',
            }}
          >
            <Paragraph
              style={{
                fontSize: 15,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
            >
              {triggers[2]}
            </Paragraph>
          </LinearGradient>
        )}
      </View>
    </View>
  );
};

MostFrequentTriggers.propTypes = {
  triggers: PropTypes.array,
};

export default MostFrequentTriggers;
