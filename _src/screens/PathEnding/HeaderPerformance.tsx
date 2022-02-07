import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, Paragraph, ProgressBar, Colors } from 'react-native-paper';
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
    <View style={styles.container} testID="path-endind-header-performance">
      <Headline>{translate('screens.PathEnding.glimpse')}</Headline>
      <View style={styles.main}>
        <View style={styles.row}>
          <Paragraph>{translate('screens.PathEnding.completion')}</Paragraph>
          <ProgressBar progress={progress ? progress / 100 : 0} />
        </View>
        <View style={styles.row}>
          <Paragraph>{translate('screens.PathEnding.habit')}</Paragraph>
          <ProgressBar progress={streakCount ? (streakCount * 10) / 180 : 0} />
        </View>
        <View style={styles.row}>
          <Paragraph>{translate('screens.PathEnding.stress-avg-level')}</Paragraph>
          <ProgressBar progress={avgStressLevel ? (avgStressLevel * 10) / 100 : 0} />
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
