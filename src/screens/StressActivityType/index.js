import Color from 'color';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Row = ({ title, subtitle }) => {
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

export default ({ navigation }) => {
  const theme = useTheme();
  const [selected, setSelection] = useState();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <TouchableOpacity
        key={`type_1`}
        onPress={() => (!selected ? setSelection(1) : null)}
        style={{ flex: 1 }}
      >
        <Row title="Reading activity" subtitle="Testimonies and facts about stress" />
      </TouchableOpacity>
      <TouchableOpacity
        key={`type_2`}
        onPress={() => (!selected ? setSelection(2) : null)}
        style={{ flex: 1 }}
      >
        <Row title="Multimedia activity" subtitle="Audio and video to learn and do" />
      </TouchableOpacity>
      <TouchableOpacity
        key={`type_3`}
        onPress={() => (!selected ? setSelection(3) : null)}
        style={{ flex: 1 }}
      >
        <Row title="Guided activity" subtitle="Breath sync and mnual tasks to relax" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rowOption: {
    flex: 1,
    // borderBottomWidth: 3,
    // borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flexWrap: 'wrap',
    // maxHeight: '10%',
  },
  surface: {
    margin: 20,
    borderRadius: 5,
    padding: 20,
    flexDirection: 'row',
  },
  rightSide: {
    justifyContent: 'center',
  },
  leftSide: {
    justifyContent: 'center',
  },
  rowIcon: {
    position: 'absolute',
    fontSize: 120,
    fontStyle: 'italic',
    fontWeight: 'bold',
    opacity: 0.25,
    right: 0,
  },
  rowText: {
    fontSize: 30,
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
    color: 'white',
    // fontWeight: 'bold',
  },
  rowTextSmall: {
    fontSize: 15,
    color: 'white',
  }
});
