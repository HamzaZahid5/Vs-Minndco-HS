/* eslint-disable react-native/no-inline-styles */
import { Paragraph, useTheme } from 'react-native-paper';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';

const AverageStressLevel = ({ level }: { level: number }) => {
  const theme = useTheme() as CustomThemeType;
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
      <Paragraph style={{ fontSize: 18 }}>{translate('screens.Statistics.progress-text')}</Paragraph>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Paragraph style={{ ...theme.fonts.heading1, fontSize: 25, lineHeight: 30 }}>
          {translate('screens.Statistics.progress-label')}
        </Paragraph>
      </View>
    </View>
  );
};

AverageStressLevel.propTypes = {
  level: PropTypes.number,
};

export default AverageStressLevel;
