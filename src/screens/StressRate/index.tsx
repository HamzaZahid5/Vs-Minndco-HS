import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Row from './AnimatedRateRow';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
import { DefaultScreenPropType } from '../../../types';

const StressRate = ({ navigation }: DefaultScreenPropType<'StressRate'>) => {
  const dispatch = useDispatch();
  const [selected, setSelection] = useState<number>();
  const rate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const onSelected = (idx: number) => {
    if (idx === selected) {
      dispatch({ type: 'currentStress/setStressLevel', payload: idx });
      navigation.push('StressTrigger');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelection(undefined);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <ScreenDecorator>
      {rate.reverse().map(i => (
        <TouchableOpacity key={`rate_${i}`} onPress={() => (!selected ? setSelection(i) : null)} style={{ flex: 1 }}>
          <Row
            selected={selected !== undefined ? selected >= i : false}
            delay={i * 50}
            value={i}
            onSelected={() => onSelected(i)}
          />
        </TouchableOpacity>
      ))}
    </ScreenDecorator>
  );
};

StressRate.propTypes = {
  navigation: PropTypes.object,
};

export default StressRate;
