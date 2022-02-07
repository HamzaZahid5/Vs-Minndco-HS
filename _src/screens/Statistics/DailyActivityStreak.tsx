/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import Color from 'color';
import { useSelector } from 'react-redux';
import { ACTIVITY_DAYS_IN_A_ROW } from '../../store/selectors';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';

const DaillyActivityStreak = () => {
  const theme = useTheme() as CustomThemeType;
  const streakCount = useSelector(ACTIVITY_DAYS_IN_A_ROW);
  return (
    <View
      style={{
        backgroundColor: Color('#F79337').lighten(0).toString(),
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
      <Paragraph style={{ ...theme.fonts.heading2, fontSize: 18, color: 'white' }}>
        {translate('screens.Statistics.habit')}
      </Paragraph>
      {streakCount === 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Paragraph style={{ ...theme.fonts.regular, color: 'white' }}>
            {translate('screens.Statistics.habit-label')}
          </Paragraph>
        </View>
      )}
      {streakCount !== 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Paragraph style={{ ...theme.fonts.heading1, fontSize: 50, lineHeight: 50, color: 'white' }}>
            {streakCount}
          </Paragraph>
          <Paragraph style={{ ...theme.fonts.regular, color: 'white' }}>
            {streakCount === 1 ? translate('commons.general.day') : translate('commons.general.days')}
          </Paragraph>
        </View>
      )}
    </View>
  );
};

DaillyActivityStreak.propTypes = {
  days: PropTypes.number,
};

export default DaillyActivityStreak;
