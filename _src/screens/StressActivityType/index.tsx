import Color from 'color';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import RowItem from '../../components/RowItem';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
import { DefaultScreenPropType } from '../../../types';
import { translate } from '../../utils/localization';
import AnalyticEvent from '../../utils/AnalyticsEvent';

//This component is not used
const Row = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const theme = useTheme();
  return (
    <View style={styles.rowOption}>
      <View style={[styles.surface, { backgroundColor: Color(theme.colors.primary).lighten(0.2).toString() }]}>
        <View style={[styles.leftSide]}>
          <Text style={styles.rowText}>{title}</Text>
          <Text style={styles.rowTextSmall}>{subtitle}</Text>
        </View>
        <View style={[styles.rightSide]}>
          <View>
            <FAB
              style={[{ elevation: 0, margin: 10 }, { backgroundColor: theme.colors.primary }]}
              icon="chevron-right"
              small
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const StressActivityType = ({ navigation }: DefaultScreenPropType<'StressActivityType'>) => {
  const theme = useTheme();
  const [selected, setSelection] = useState<number>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelection(undefined);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    switch (selected) {
      case 1:
        AnalyticEvent('reliever_activity_read');
        navigation.navigate('StressActivityToDo', { type: 'READ' });
        break;
      case 2:
        AnalyticEvent('reliever_activity_listen');
        navigation.navigate('StressActivityToDo', { type: 'LISTEN' });
        break;
      case 3:
        AnalyticEvent('reliever_activity_do');
        navigation.navigate('StressActivityToDo', { type: 'DO' });
        break;
    }
  }, [navigation, selected]);
  return (
    <ScreenDecorator>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', padding: 20 }}>
        <RowItem
          title={translate('screens.StressActivityType.reading-activity')}
          text={translate('screens.StressActivityType.reading-activity-text')}
          onPress={() => (!selected ? setSelection(1) : null)}
          testID="stress-activity-reading"
        />
        <RowItem
          title={translate('screens.StressActivityType.multimedia-activity')}
          text={translate('screens.StressActivityType.multimedia-activity-text')}
          onPress={() => (!selected ? setSelection(2) : null)}
          testID="stress-activity-audio"
        />
        <RowItem
          title={translate('screens.StressActivityType.guided-activity')}
          text={translate('screens.StressActivityType.guided-activity-text')}
          onPress={() => (!selected ? setSelection(3) : null)}
          testID="stress-activity-guided"
        />
      </View>
    </ScreenDecorator>
  );
};

export default StressActivityType;

const styles = StyleSheet.create({
  rowOption: {
    flex: 1,
    // borderBottomWidth: 3,
    // borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // maxHeight: '10%',
    padding: 20,
  },
  surface: {
    width: '100%',
    // boxSizing: 'border-box',
    margin: 20,
    borderRadius: 5,
    padding: 20,
    flexDirection: 'row',
  },
  rightSide: {
    // flex: 1,
    justifyContent: 'center',
  },
  leftSide: {
    flex: 1,
    justifyContent: 'center',
  },
  rowIcon: {
    position: 'absolute',
    fontSize: 120,
    fontStyle: 'italic',
    // fontWeight: 'bold',
    opacity: 0.25,
    right: 0,
  },
  rowText: {
    fontSize: 25,
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
    color: 'white',
    // fontWeight: 'bold',
  },
  rowTextSmall: {
    fontSize: 15,
    color: 'white',
  },
});
