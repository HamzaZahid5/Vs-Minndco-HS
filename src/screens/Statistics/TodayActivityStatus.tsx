/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// @ts-ignore: non-ts file
import useTodaysActivityDone from '../../utils/hooks/useTodaysActivityDone';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';

const TodayActivityStatus = () => {
  const theme = useTheme() as CustomThemeType;
  const todaysActivityDone = useTodaysActivityDone();
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
      <Paragraph style={{ ...theme.fonts.heading2, fontSize: 18 }}>
        {translate('screens.Statistics.daily-activity')}
      </Paragraph>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name={todaysActivityDone ? 'progress-check' : 'progress-alert'} size={60} color="#F79337" />
        <Paragraph style={{ ...theme.fonts.regular }}>
          {todaysActivityDone ? translate('screens.Statistics.done') : translate('screens.Statistics.pending')}
        </Paragraph>
      </View>
    </View>
  );
};

export default TodayActivityStatus;
