import React from 'react';
import { View, Text } from 'react-native';
import ScreenDecorator from '../../components/ScreenDecorator';
import Carousel from '../../components/Carousel';

export default ({ onFinish = Function }) => {
  return (
    <ScreenDecorator>
      <Carousel
        items={[{
          title: 'Constancy',
          content: (
            <View>
              <Text style={{color: 'red'}}>This is</Text>
            </View>
          ),
        }, {
          title: 'Triggers',
          content: (
            <View>
              <Text style={{color: 'red'}}>The How To</Text>
            </View>
          ),
        }, {
          title: 'Progress',
          content: (
            <View>
              <Text style={{color: 'red'}}>For the progrma</Text>
            </View>
          ),
        }]}
      />
    </ScreenDecorator>
  );
};
