import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import Color from 'color';

const StressLevelsChart = ({ data = [] }) => {
  const [segments, setSegments] = useState(1);
  const theme = useTheme();
  useEffect(() => {
    if (data.length) {
      setSegments(Math.max(...data) - Math.min(...data));
    }
  }, [data]);
  const SIZE = Math.max(Dimensions.get('window').width, Dimensions.get('window').height);
  const cardColor = Color('#F79337').lighten(0).toString();
  return (
    !!data.length && (
      <View
        style={{
          backgroundColor: 'red',
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
        }}
      >
        <Paragraph style={{ ...theme.fonts.heading2, fontSize: 20, color: '#FFFFFF' }}>Level trending</Paragraph>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: SIZE / 3 }}>
          <LineChart
            data={{
              // labels: [],
              datasets: [
                {
                  data,
                },
              ],
            }}
            segments={segments}
            width={Dimensions.get('window').width - Dimensions.get('window').width * 0.05}
            height={SIZE / 3}
            yAxisInterval={1} // optional, defaults to 1
            // withVerticalLabels={false}
            withVerticalLines={false}
            getDotColor={() => cardColor}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                // borderRadius: 16
                // width: SIZE/3,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#fff',
              },
            }}
            bezier
            style={{
              marginLeft: Dimensions.get('window').width * -0.05,
              alignItems: 'center',
              justifyContent: 'center',
              width: Dimensions.get('window').width - Dimensions.get('window').width * 0.05,
              // marginVertical: 8,
              // borderRadius: 16
            }}
          />
        </View>
      </View>
    )
  );
};

StressLevelsChart.propTypes = {
  data: PropTypes.array,
};

export default StressLevelsChart;
