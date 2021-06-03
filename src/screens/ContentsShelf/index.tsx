import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
// @ts-ignore: non-ts file
import GenericPageLayout from '../../components/GenericPageLayout';
// @ts-ignore: non-ts file
import RowItem from '../../components/RowItem';
import useProgramActivitiesByCategory from '../../utils/hooks/useProgramActivitiesByCategory';
import Props from './types';
import { ProgramActivity } from '../../../types';
import { PROGRESS } from '../../store/selectors';
// @ts-ignore: non-ts file
import { getActivityFromKey } from '../../utils/helpers';

const ContentsShelf = ({ navigation, route }: Props): JSX.Element => {
  // const theme = useTheme();
  const contentCategory = route.params.category;
  const styles = getStyles();
  const activities = useProgramActivitiesByCategory(contentCategory) || [];
  const uniqueActivities = activities.reduce((r: Record<string, ProgramActivity>, a: ProgramActivity) => {
    if (!r.hasOwnProperty(a.id)) {
      r[a.id] = a;
    }
    return r;
  }, {});
  const progress = useSelector(PROGRESS);
  const onlyActivityNameProgress = progress?.map(getActivityFromKey);
  const getActivityRowItem = (act: ProgramActivity) => {
    const locked = !onlyActivityNameProgress.includes(act.id);
    return (
      <RowItem
        key={act.id}
        title={act.name}
        text={locked ? 'unlocks from Daily Activity screen' : 'tap to play'}
        locked={locked}
        // reverse
        onPress={() => navigation.push('HowItWorks')}
      />
    );
  };
  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        header={
          <View>
            <Paragraph>Contents</Paragraph>
          </View>
        }
      >
        <View style={styles.bodyContainer}>{Object.values(uniqueActivities).map(getActivityRowItem)}</View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

export default ContentsShelf;

const getStyles = () =>
  StyleSheet.create({
    bodyContainer: {
      flexGrow: 1,
      margin: 'auto',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  });
