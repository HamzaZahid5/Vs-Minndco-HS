import React from 'react';
import ScreenDecorator from '../../components/ScreenDecorator';
import HowToProgram from './Program';

export default () => {
  return (
    <ScreenDecorator>
      {/* How To screen based on params */}
      <HowToProgram onFinish={() => navigation.navigateTo('PathEnding')}/>
    </ScreenDecorator>
  );
}