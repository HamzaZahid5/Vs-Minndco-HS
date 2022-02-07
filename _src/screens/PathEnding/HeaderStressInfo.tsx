import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, Paragraph, ProgressBar, Colors, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ACTIVITY_DAYS_IN_A_ROW, AVERAGE_STRESS } from '../../store/selectors';
// @ts-ignore: non-ts file
import useCompletion from '../../utils/hooks/useCompletion';
// @ts-ignore: non-ts file
import useJournal from '../../utils/hooks/useJournal';
import { journalType } from '../../../types';
import { translate } from '../../utils/localization';
import { triggerKeyToLabel } from '../StressTrigger';
import { LinearGradient } from 'expo-linear-gradient';
import Color from 'color';
import { CustomThemeType } from '../../utils/OriginalTheme';

const getFrequentTriggersFromJournal = (journal: { reason: string }[] = []) => {
  const triggersWithScores = journal.reduce((r, item) => {
    if (!r.hasOwnProperty(item.reason)) {
      r[item.reason] = 0;
    }
    r[item.reason]++;
    return r;
  }, {} as Record<string, number>);

  return Object.entries(triggersWithScores)
    .map(i => ({ label: triggerKeyToLabel(i[0]), count: i[1] }))
    .sort((a: { label: string; count: number }, b: { label: string; count: number }): number => {
      if (a.count > b.count) return -1;
      if (a.count < b.count) return 1;
      return 0;
    });
};

const HeaderStressInfo = () => {
  const styles = getStyles();
  const journal = (useJournal() || []) as journalType[];
  const triggers = getFrequentTriggersFromJournal(journal).map(t => t.label);
  return (
    <View style={styles.container} testID="path-endind-header-performance">
      <Headline>{translate('screens.Statistics.frequent-triggers')}</Headline>
      <View style={styles.main}>
        <View style={styles.row}>
          {!triggers.length && (
            <Paragraph style={{ fontSize: 15, color: '#0006', textAlign: 'center' }}>
              {translate('screens.Statistics.no-triggers')}
            </Paragraph>
          )}
          {triggers[0] && (
            <View style={styles.triggerTextContainer}>
              <Paragraph style={styles.triggerText}>1- {triggers[0]}</Paragraph>
            </View>
          )}
          {triggers[1] && (
            <View style={styles.triggerTextContainer}>
              <Paragraph style={styles.triggerText}>2- {triggers[1]}</Paragraph>
            </View>
          )}
          {triggers[2] && (
            <View style={styles.triggerTextContainer}>
              <Paragraph style={styles.triggerText}>3- {triggers[2]}</Paragraph>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default HeaderStressInfo;

const getStyles = () =>
  StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    main: {
      flexDirection: 'column',
      width: '80%',
      // marginHorizontal: 50,
    },
    row: {
      borderWidth: 0,
      borderColor: 'red',
      justifyContent: 'center',
      width: '100%',
      padding: 3,
    },
    triggerText: {
      fontSize: 15,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    triggerTextContainer: {
      marginHorizontal: 7,
      marginVertical: 10,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  });
