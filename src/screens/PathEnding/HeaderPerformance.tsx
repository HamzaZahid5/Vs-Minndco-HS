import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, Paragraph, ProgressBar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ACTIVITY_DAYS_IN_A_ROW } from '../../store/selectors';
// @ts-ignore: non-ts file
import useCompletion from '../../utils/hooks/useCompletion';
// @ts-ignore: non-ts file
import useJournal from '../../utils/hooks/useJournal';
import { journalType } from '../../../types';
import { translate } from '../../utils/localization';

const HeaderPerfromance = () => {
  const styles = getStyles();
  const progress = useCompletion();
  const streakCount = useSelector(ACTIVITY_DAYS_IN_A_ROW) + 1;
  const journal = (useJournal() || []) as journalType[];
  const avgStressLevel = journal.reduce((r: number, i) => r + i.level, 0) / journal.length;
  return (
    <View style={styles.container}>
      <Headline>{translate('A glimpse to your progress')}</Headline>
      <View style={styles.main}>
        <View style={styles.row}>
          <Paragraph>{translate('Completion')}</Paragraph>
          <ProgressBar progress={progress / 100} />
        </View>
        <View style={styles.row}>
          <Paragraph>{translate('Habit')}</Paragraph>
          <ProgressBar progress={(streakCount * 10) / 180} />
        </View>
        <View style={styles.row}>
          <Paragraph>{translate('Stress avg level')}</Paragraph>
          <ProgressBar progress={(avgStressLevel * 10) / 100} />
        </View>
      </View>
    </View>
  );
};

export default HeaderPerfromance;

const getStyles = () =>
  StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    main: {
      flexDirection: 'column',
      flexBasis: '100%',
      width: '50%',
      margin: 'auto',
      // marginHorizontal: 50,
    },
    row: {
      borderWidth: 0,
      borderColor: 'red',
      justifyContent: 'center',
      width: '100%',
      padding: 10,
    },
  });
