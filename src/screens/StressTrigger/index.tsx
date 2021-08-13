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
  'talking_family',
  'on_a_date',
  'thinking_relationship',
  'studying',
  'thinking_financials',
  // 'feeling_sick',
  // 'arguing_someone',
  // 'driving',
  'other',
];
export const labels = () => [
  translate('Working'),
  translate('Talking with family'),
  translate('On a date'),
  translate('Thinking on relationships'),
  translate('Studying'),
  translate('Thinking on financials'),
  // 'Feeling sick',
  // 'Arguing with someone',
  // 'Driving',
  translate('Other'),
];
const StressTrigger = ({ navigation }: DefaultScreenPropType<'StressTrigger'>) => {
  const { saveStressOMeter } = useAppActions();

  const [selected, setSelection] = useState<typeof options[number]>();

  useEffect(() => {
    if (selected) {
      saveStressOMeter(selected);

      navigation.push('StressActivityType');
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
