import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenDecorator from '../../components/ScreenDecorator';
import RowItem from '../../components/RowItem';
import useAppActions from './actions';

export const triggerKeyToLabel = key => {
  return labels[options.findIndex(k => k === key)];
}

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
export const labels = [
  'Working',
  'Talking with family',
  'On a date',
  'Thinking on relationships',
  'Studying',
  'Thinking on financials',
  // 'Feeling sick',
  // 'Arguing with someone',
  // 'Driving',
  'Other',
];
export default ({ navigation }) => {
  const theme = useTheme();
  const { saveStressOMeter } = useAppActions();
  
  const [selected, setSelection] = useState();
  
  // const icons = [
  //   'account-hard-hat',
  //   'account-group',
  //   'head-heart',
  //   'heart-broken',
  //   'bookshelf',
  //   'cash-multiple',
  //   // 'pill',
  //   // 'account-voice',
  //   // 'car-multiple',
  //   'help-rhombus',
  // ];

  useEffect(() => {
    if (selected) {
      saveStressOMeter(selected);
      
      navigation.push('StressActivityType');
    }
  }, [selected]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSelection(undefined);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  
  return (
    <ScreenDecorator>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', padding: 20 }}>
        
      {options.map((value, i) => (
        <RowItem
          key={`activity_${value}`}
          title={labels[i]}
          text=""
          onPress={() => (!selected ? setSelection(value) : null)}
        />
      ))}
      </View>
    </ScreenDecorator>
  );
};

const styles = StyleSheet.create({
  rowOption: {
    flex: 1,
    borderBottomWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flexWrap: 'wrap',
    // maxHeight: '10%',
  },
  rowIcon: {
    position: 'absolute',
    fontSize: 120,
    fontStyle: 'italic',
    fontWeight: 'bold',
    opacity: 0.25,
    right: 0,
  },
  rowNumberSmall: {
    fontSize: 30,
    position: 'absolute',
    left: 0,
    bottom: 0,
    color: 'white',
    fontWeight: 'bold',
  },
});
