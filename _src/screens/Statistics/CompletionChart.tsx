/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import { ProgressChart } from 'react-native-chart-kit';
import Color from 'color';
// @ts-ignore: non-ts file
import useCompletion from '../../utils/hooks/useCompletion';
import { ProgressChartData } from 'react-native-chart-kit/dist/ProgressChart';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';

const chartConfig = {
  backgroundGradientFrom: 'transparent',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: 'transparent',
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => {
    // console.log(opacity);
    const [r, g, b] = Color('#FFF').array();
    return `rgba(${r}, ${g}, ${b}, ${opacity * 2})`;
  },
  // strokeWidth: 2, // optional, default 3
  // barPercentage: 0.5,
  // useShadowColorFromDataset: false // optional
};
const CompletionChart = () => {
  const theme = useTheme() as CustomThemeType;
  const progress = useCompletion();
  const [data, setData] = useState<ProgressChartData>();
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    if (progress) {
      setData({
        labels: ['completion'], // optional
        // looks like a bug with decimals for circle chart
        data: [Math.floor(progress) / 100],
      });
    }
  }, [progress]);
  // const SIZE = Math.min(width, height);
  const SIZE = Math.max(width, height);
  return (
    <View
      style={{
        backgroundColor: Color('#87B1E3').lighten(0).toString(),
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
      <Paragraph style={{ ...theme.fonts.heading2, fontSize: 18, color: '#FFF' }}>
        {translate('screens.Statistics.program-completion')}
      </Paragraph>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: SIZE / 3 }}>
        <View style={{ flex: 1 }} />
        {progress === 0 && (
          <View
            style={{
              position: 'absolute',
              width: SIZE,
              height: SIZE,
              alignItems: 'center',
              justifyContent: 'center',
              // flexWrap: 'wrap',
            }}
          >
            <Paragraph
              style={{
                ...theme.fonts.heading2,
                fontSize: 18,
                color: '#FFF',
                textAlign: 'center',
                maxWidth: '50%',
              }}
            >
              {translate('screens.Statistics.completition-label')}
            </Paragraph>
          </View>
        )}
        {progress !== 0 && (
          <>
            <View style={{ position: 'absolute' }}>
              {data && (
                <ProgressChart
                  data={data}
                  width={SIZE / 3}
                  height={SIZE / 3}
                  strokeWidth={12}
                  radius={SIZE / 8}
                  hideLegend
                  chartConfig={chartConfig}
                />
              )}
            </View>
            <View
              style={{
                position: 'absolute',
                width: SIZE,
                height: SIZE,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Paragraph style={{ fontSize: 40, lineHeight: 40, color: '#FFF' }}>{progress}%</Paragraph>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default CompletionChart;
