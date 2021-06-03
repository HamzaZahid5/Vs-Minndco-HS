import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import ScreenDecorator from '../../components/ScreenDecorator';
import Carousel from '../../components/Carousel';
import { usePathEndingBarButton } from '../PathEnding';

const HowItWorks = ({ navigation }) => {
  usePathEndingBarButton(navigation, {
    routeParams: {
      header: {
        type: 'learning',
      },
      body: {
        options: ['LearnRow', 'StressManagementRow', 'TutorialRow'],
      },
    },
  });
  return (
    <ScreenDecorator>
      <Carousel
        items={[
          {
            content: (
              <View>
                <Text style={{ color: 'red' }}>Constancy: This is</Text>
              </View>
            ),
          },
          {
            content: (
              <View>
                <Text style={{ color: 'red' }}>Triggers: The How To</Text>
              </View>
            ),
          },
          {
            content: (
              <View>
                <Text style={{ color: 'red' }}>Progress: For the progrma</Text>
              </View>
            ),
          },
        ]}
      />
    </ScreenDecorator>
  );
};

HowItWorks.propTypes = {
  navigation: PropTypes.object,
};

export default HowItWorks;
