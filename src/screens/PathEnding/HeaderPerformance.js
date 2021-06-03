import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Headline, Paragraph, ProgressBar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ACTIVITY_DAYS_IN_A_ROW } from '../../store/selectors';
import useCompletion from '../../utils/hooks/useCompletion';
import useJournal from '../../utils/hooks/useJournal';

const HeaderPerfromance = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const progress = useCompletion();
  const streakCount = useSelector(ACTIVITY_DAYS_IN_A_ROW);
  const journal = useJournal() || [];
  const avgStressLevel = journal.reduce((r, i) => r + i.level, 0) / journal.length;
  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>A glimpse to your progress</Headline>
      <View style={styles.main}>
        <View>
          <Paragraph>Completion</Paragraph>
          <ProgressBar progress={progress} />
        </View>
        <View>
          <Paragraph>Habit</Paragraph>
          <ProgressBar progress={(streakCount * 100) / 20} />
        </View>
        <View>
          <Paragraph>Avg level</Paragraph>
          <ProgressBar progress={(avgStressLevel * 100) / 10} />
        </View>
      </View>
    </View>
  );
};

export default HeaderPerfromance;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    main: {
      flexDirection: 'column',
    },
  });
