/**
 * File for web version:
 *  always renders then Canvas since no issue with remote debug here.
 */
import React from 'react';
import { Canvas } from 'react-three-fiber';

const SafeCanvas = props => {
  return <Canvas {...props} />;
};

export default SafeCanvas;
