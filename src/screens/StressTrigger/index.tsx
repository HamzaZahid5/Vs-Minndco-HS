import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
// @ts-ignore: non-ts file
import RowItem from '../../components/RowItem';
import useAppActions from './actions';
import { DefaultScreenPropType } from '../../../types';
import { translate } from '../../utils/localization';

export const triggerKeyToLabel = (key: string) => {
  return labels()[options.findIndex(k => k === key)];
};

export const options = [
  'working',
  'talking_with_family',
  // 'on_a_date',
  'society_uncertainty',
  'thinking_on_relationships',
  'studying',
  'thinking_on_financials',
  // 'feeling_sick',
  // 'arguing_someone',
  // 'driving',
  'other',
];
export const labels = () => options.map(o => translate(`screens.StressTrigger.${o}`));

const StressTrigger = ({ navigation }: DefaultScreenPropType<'StressTrigger'>) => {
  const { saveStressOMeter } = useAppActions();

  const [selected, setSelection] = useState<typeof options[number]>();

  useEffect(() => {
    if (selected) {
      saveStressOMeter(selected);

      navigation.navigate('StressActivityType');
    }
  }, [navigation, saveStressOMeter, selected]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelection(undefined);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <ScreenDecorator>
      <View style={styles.screenDecorator}>
        {options.map((value, i) => (
          <RowItem
            key={`activity_${value}`}
            title={labels()[i]}
            text=""
            onPress={() => (!selected ? setSelection(value) : null)}
            testID={`stress-trigger-${i + 1}`}
          />
        ))}
      </View>
    </ScreenDecorator>
  );
};

export default StressTrigger;

const styles = StyleSheet.create({
  screenDecorator: { flex: 1, flexDirection: 'column', justifyContent: 'space-around', padding: 20 },
});
