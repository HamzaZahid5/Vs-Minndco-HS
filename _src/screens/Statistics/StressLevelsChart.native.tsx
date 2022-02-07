/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, useWindowDimensions } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import Color from 'color';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';

const StressLevelChart = ({ data = [] }: { data: number[] }) => {
  const [segments, setSegments] = useState(1);
  const [chartData, setChartData] = useState([0]);
  const [isEmpty, setIsEmpty] = useState(true);
  const theme = useTheme() as CustomThemeType;
  const { width: WIDTH, height: HEIGHT } = useWindowDimensions();
  useEffect(() => {
    if (data.length) {
      setSegments(Math.max(...data) - Math.min(...data));
      setChartData(data);
      setIsEmpty(false);
    }
  }, [data]);

  const cardColor = Color('#F79337').lighten(0).toString();
  return (
    <>
      {chartData.length && (
        <View
          style={{
            backgroundColor: cardColor,
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
          <Paragraph style={{ ...theme.fonts.heading2, fontSize: 18, color: '#FFFFFF', textAlign: 'center' }}>
            {translate('screens.Statistics.level-trending')}
          </Paragraph>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: WIDTH - WIDTH * 0.12 }}>
            {isEmpty && (
              <Paragraph style={{ ...theme.fonts.heading2, fontSize: 18, color: '#FFFFFFAA' }}>
                {translate('screens.Statistics.no-trending')}
              </Paragraph>
            )}
            {!isEmpty && (
              <LineChart
                data={{
                  labels: [],
                  datasets: [
                    {
                      data: chartData,
                    },
                  ],
                }}
                segments={segments}
                width={WIDTH - WIDTH * 0.05}
                height={HEIGHT / 3}
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
                  marginLeft: WIDTH * -0.05,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: WIDTH - WIDTH * 0.05,
                  // marginVertical: 8,
                  // borderRadius: 16
                }}
              />
            )}
          </View>
        </View>
      )}
    </>
  );
};

StressLevelChart.propTypes = {
  data: PropTypes.array,
};

export default StressLevelChart;
