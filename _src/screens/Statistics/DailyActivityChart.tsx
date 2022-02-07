/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { View, useWindowDimensions } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';

const DailyActivityChart = ({ data = [] }) => {
  const theme = useTheme() as CustomThemeType;
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        backgroundColor: 'blue',
        borderRadius: 24,
        padding: 14,
        height: '100%',
        justifyContent: 'flex-start',
      }}
    >
      <Paragraph style={{ ...theme.fonts.heading2, fontSize: 19 }}>
        {translate('screens.Statistics.days-with-activities')}
      </Paragraph>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LineChart
          data={{
            labels: ['', '', '', '', '', '', ''],
            datasets: [
              {
                data,
              },
            ],
          }}
          width={width - width * 0.1} // from react-native
          height={220}
          yAxisInterval={1} // optional, defaults to 1
          withHorizontalLabels={false}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

DailyActivityChart.propTypes = {
  data: PropTypes.array,
};

export default DailyActivityChart;
