import React from 'react';
import ScreenDecorator from '../../components/ScreenDecorator';
import HowToProgram from './Program';
import {usePathEndingBarButton} from '../PathEnding'

export default ({ navigation }) => {
  usePathEndingBarButton(navigation,  { routeParams: {
    header: {
      type: 'statistics',
    },
    body: {
      options: ['TutorialRow', 'LearnRow', 'StressManagementRow'],
    }
  }});
  return (
    <ScreenDecorator>
      {/* How To screen based on params */}
      <HowToProgram />
    </ScreenDecorator>
  );
}