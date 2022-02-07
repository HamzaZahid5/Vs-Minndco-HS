import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Headline, Paragraph, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Color from 'color';
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
import { getActivityIdFromKey } from '../../utils/helpers';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';

const ContentsShelf = ({ navigation, route }: Props): JSX.Element => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  const contentCategory = route.params.category;
  const descriptionByCategory =
    contentCategory === 'education'
      ? translate('screens.ContentsShelf.contentCategory-education')
      : contentCategory === 'relaxation'
      ? translate('screens.ContentsShelf.contentCategory-relaxation')
      : contentCategory === 'mindfulness'
      ? translate('screens.ContentsShelf.contentCategory-mindfulness')
      : '';
  const activities = useProgramActivitiesByCategory(contentCategory) || [];
  const uniqueActivities = activities.reduce((r: Record<string, ProgramActivity>, a: ProgramActivity) => {
    if (!r.hasOwnProperty(a.id)) {
      r[a.id] = a;
    }
    return r;
  }, {});
  const progress = useSelector(PROGRESS);
  const onlyActivityNameProgress = progress?.map(getActivityIdFromKey);
  const getActivityRowItem = (act: ProgramActivity) => {
    const locked = !onlyActivityNameProgress.includes(act.id);
    return (
      <RowItem
        key={act.id}
        title={act.name}
        text={
          locked
            ? translate('screens.ContentsShelf.repeatButton-locked')
            : translate('screens.ContentsShelf.repeatButton-unlocked')
        }
        locked={locked}
        // reverse
        onPress={() => navigation.navigate('Activity', { activityId: act.id })}
      />
    );
  };
  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        header={
          <View style={styles.container}>
            <Headline style={styles.headline}>
              {translate(`screens.ContentsShelf.category-${contentCategory.toLocaleLowerCase()}`)}
            </Headline>
            <Paragraph style={styles.paragraph}>{descriptionByCategory}</Paragraph>
            <View style={styles.infoContainer}>
              <Text style={[styles.infoText, { color: theme.colors.dark }]}>
                {translate('screens.ContentsShelf.contents-unlock-text')}
              </Text>
            </View>
          </View>
        }
      >
        <View style={styles.bodyContainer}>{Object.values(uniqueActivities).map(getActivityRowItem)}</View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

export default ContentsShelf;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    bodyContainer: {
      flexGrow: 1,
      margin: 'auto',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    container: {
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 20,
    },
    headline: {
      ...theme.fontsHelper.heading2,
      color: 'white',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
    paragraph: {
      textAlign: 'center',
    },
    infoContainer: {
      width: 250,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    infoText: {
      // color: theme.customs.colors.Green,
      textAlign: 'center',
      margin: 5,
    },
  });
