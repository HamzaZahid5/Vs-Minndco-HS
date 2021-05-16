import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import {
  ProgressChart,
} from "react-native-chart-kit";

const chartConfig = {
  backgroundGradientFrom: "transparent",
  // backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "transparent",
  // backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  // strokeWidth: 2, // optional, default 3
  // barPercentage: 0.5,
  // useShadowColorFromDataset: false // optional
};
export default ({ progress = 0.85 }) => {
  const theme = useTheme();
  const data = {
    labels: ["completion"], // optional
    data: [progress]
  };
  const SIZE = Math.min(Dimensions.get('window').width, Dimensions.get('window').height);
  return (
    <View style={{
      backgroundColor: 'blue',
      borderRadius: 24,
      padding: 14,
      height: '100%',
      justifyContent: 'flex-start',
    }}>
      <Paragraph style={{ ...theme.fonts.heading2, fontSize: 20 }}>
        Program completion
      </Paragraph>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: SIZE - SIZE / 8 }}>
        <View style={{ flex: 1 }}/>
        <View style={{ position: 'absolute' }}>
          <ProgressChart
            data={data}
            width={SIZE}
            height={SIZE}
            strokeWidth={12}
            radius={SIZE / 4}
            hideLegend
            chartConfig={chartConfig}
          />
        </View>
        <View style={{ position: 'absolute', width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' }}>
          <Paragraph style={{ fontSize: 40}}>{progress * 100}%</Paragraph>
        </View>
      </View>
    </View>
  );
};