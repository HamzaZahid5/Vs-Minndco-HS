import React from "react";
import { View, Dimensions } from "react-native";
import { useTheme } from 'react-native-paper';

const CONFIGS = [
  [
    {
      color: '#87B1E3',
      size: 480,
      pos: {
        right: -185,
        top: -208,
      }
    }, {
      color: '#75C1E1',
      size: 225,
      pos: {
        right: -40,
        top: 220,
      }
    }, {
      color: '#75C1E1',
      size: 187,
      pos: {
        left: -6,
        top: 30,
      }
    }, {
      color: '#87B1E3',
      size: 60,
      pos: {
        left: 60,
        top: 210,
      }
    }, 
  ],
];
export default () => {
  const theme = useTheme();
  return (
    <View
      style={{
        zIndex: -1,
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: Dimensions.get('window').height - 64,
        backgroundColor: theme.colors.primary,
        overflow: 'hidden',
      }}
    >
      {CONFIGS[0].map(c => (
        <View
          key={c.color + c.size}
          style={{
            backgroundColor: c.color,
            width: c.size,
            height: c.size,
            borderRadius: c.size / 2,
            position: 'absolute',
            opacity: 0.5,
            ...c.pos,
          }}
        />
      ))}
      {/* <View
        style={{
          backgroundColor: 'red',
          width: 200,
          height: 200,
          borderRadius: 100,
          position: 'absolute',
          top:  -50,
          right: -120,
          opacity: 0.25,
        }}
      />
      <View
        style={{
          backgroundColor: 'red',
          width: 100,
          height: 100,
          borderRadius: 50,
          position: 'absolute',
          top:  150,
          right: 20,
          opacity: 0.25,
        }}
      /> */}
    </View>
  )
}