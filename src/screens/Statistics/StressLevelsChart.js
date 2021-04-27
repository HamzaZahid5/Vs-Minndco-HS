import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import {
  LineChart,
} from "react-native-chart-kit";

export default ({ days }) => {
  const theme = useTheme();
  return (
    <View style={{
      backgroundColor: 'blue',
      borderRadius: 24,
      padding: 14,
      height: '100%',
      justifyContent: 'flex-start',
    }}>
      <Paragraph style={{ ...theme.fonts.heading2, fontSize: 20 }}>
        Level trending
      </Paragraph>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LineChart
          data={{
            labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width-Dimensions.get("window").width*0.1} // from react-native
          height={220}
          yAxisInterval={1} // optional, defaults to 1
          withHorizontalLabels={false}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
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
              stroke: "#ffa726"
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
