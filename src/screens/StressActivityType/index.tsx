import Color from 'color';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import RowItem from '../../components/RowItem';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
import { DefaultScreenPropType } from '../../../types';

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
    switch (selected) {
      case 1:
        navigation.push('StressActivityToDo', { type: 'READ' });
        break;
      case 2:
        navigation.push('StressActivityToDo', { type: 'LISTEN' });
        break;
      case 3:
        navigation.push('StressActivityToDo', { type: 'DO' });
        break;
    }
  }, [navigation, selected]);
  return (
    <ScreenDecorator>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', padding: 20 }}>
        <RowItem
          title="Reading activity"
          text="Testimonies and facts about stress"
          onPress={() => (!selected ? setSelection(1) : null)}
        />
        <RowItem
          title="Multimedia activity"
          text="Audio and video to learn and do"
          onPress={() => (!selected ? setSelection(2) : null)}
        />
        <RowItem
          title="Guided activity"
          text="Breath sync and interactive content to relax"
          onPress={() => (!selected ? setSelection(3) : null)}
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
