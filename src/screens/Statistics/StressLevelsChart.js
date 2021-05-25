import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import {
  LineChart,
} from "react-native-chart-kit";
import Color from 'color';

export default ({ data = [] }) => {
  const theme = useTheme();
  const SIZE = Math.max(Dimensions.get('window').width, Dimensions.get('window').height);
  return (
    <View style={{
      backgroundColor: Color('#F79337').lighten(0).toString(),
      width: '100%',
      borderRadius: 24,
      padding: 14,
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      shadowColor: '#664AB9',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 2,
    }}>
      <Paragraph style={{ ...theme.fonts.heading2, fontSize: 20, color: '#FFFFFF' }}>
        Level trending
      </Paragraph>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: SIZE / 3 }}>
        <LineChart
          data={{
            // labels: [],
            datasets: [
              {
                data,
              }
            ]
          }}
          width={Dimensions.get('window').width}
          height={SIZE/3}
          yAxisInterval={1} // optional, defaults to 1
          withHorizontalLabels={false}
          chartConfig={{
            backgroundColor: "transparent",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#fff"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    </View>
  );
};
