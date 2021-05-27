import React from 'react';
import { View, Text } from 'react-native';
import ScreenDecorator from '../../components/ScreenDecorator';
import Carousel from '../../components/Carousel';

export default () => {
  return (
    <ScreenDecorator>
      <Carousel
        items={[{
          content: (
            <View>
              <Text style={{color: 'red'}}>Constancy: This is</Text>
            </View>
          ),
        }, {
          content: (
            <View>
              <Text style={{color: 'red'}}>Triggers: The How To</Text>
            </View>
          ),
        }, {
          content: (
            <View>
              <Text style={{color: 'red'}}>Progress: For the progrma</Text>
            </View>
          ),
        }]}
      />
    </ScreenDecorator>
  );
};
