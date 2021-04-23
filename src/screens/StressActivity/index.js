import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenDecorator from '../../components/ScreenDecorator';
import RowItem from '../../components/RowItem';
import useAppActions from './actions';

export default ({ navigation }) => {
  const theme = useTheme();
  const { saveStressOMeter } = useAppActions();
  
  const [selected, setSelection] = useState();
  const options = [
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
  const labels = [
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
  const icons = [
    'account-hard-hat',
    'account-group',
    'head-heart',
    'heart-broken',
    'bookshelf',
    'cash-multiple',
    // 'pill',
    // 'account-voice',
    // 'car-multiple',
    'help-rhombus',
  ];

  useEffect(() => {
    if (selected) {
      saveStressOMeter(selected);
      
      navigation.push('StressActivityType');
    }
  }, [selected])
  
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
        // <TouchableOpacity
        // onPress={() => (!selected ? setSelection(value) : null)}
        // style={{ flex: 1 }}
        // >
        //   <View style={styles.rowOption}>
        //     <Icon style={[styles.rowIcon]} name={icons[i]} />
        //     <Text style={styles.rowNumberSmall}>{labels[i]}</Text>
        //   </View>
        // </TouchableOpacity>
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
