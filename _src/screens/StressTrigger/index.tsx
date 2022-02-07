import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
// @ts-ignore: non-ts file
import RowItem from '../../components/RowItem';
import { DefaultScreenPropType, DefaultScreenRouteType } from '../../../types';
import { translate } from '../../utils/localization';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_STRESS_INPUT } from '../../store/selectors';
import useStartPath from '../../utils/hooks/useStartPath';

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

const StressTrigger = ({
  navigation,
  route,
}: DefaultScreenPropType<'StressTrigger'> & DefaultScreenRouteType<'StressTrigger'>) => {
  const { stressLevel } = useSelector(CURRENT_STRESS_INPUT);
  const [selected, setSelection] = useState<typeof options[number]>();
  const dispatch = useDispatch();
  useStartPath('rate_stress');

  useEffect(() => {
    if (selected) {
      dispatch({ type: 'currentStress/setTriggerActivity', payload: selected });

      navigation.navigate('StressRate', { isTrigerIdentification: route.params?.isTrigerIdentification ?? true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, stressLevel]);

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
