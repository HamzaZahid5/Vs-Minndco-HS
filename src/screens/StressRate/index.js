import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Row from './AnimatedRateRow';
import ScreenDecorator from '../../components/ScreenDecorator';

const StressRate = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selected, setSelection] = useState();
  const rate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const colorsIni = [
    '#2B69DA',
    '#31CCCC',
    '#37AD38',
    '#68C33B',
    '#9DDB3D',
    '#FBF042',
    '#F8BE54',
    '#F8BE54',
    '#F48568',
    '#F34C78',
  ];
  const colorsEnd = [
    '#014BD2',
    '#01BFBF',
    '#019800',
    '#3CB102',
    '#7FCE00',
    '#BDE500',
    '#CCBC00',
    '#F4A414',
    '#F1542B',
    '#EC0040',
  ];

  const onSelected = idx => {
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
          <Row selected={selected >= i} delay={i * 50} value={i} onSelected={() => onSelected(i)} />
        </TouchableOpacity>
      ))}
    </ScreenDecorator>
  );
};

StressRate.propTypes = {
  navigation: PropTypes.object,
};

export default StressRate;
