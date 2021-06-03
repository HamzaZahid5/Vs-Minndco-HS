import React from 'react';
import { Canvas } from 'react-three-fiber';

const SafeCanvas = props => {
  const isDebuggingEnabled = typeof atob !== 'undefined';
  return isDebuggingEnabled ? null : <Canvas {...props} />;
};

export default SafeCanvas;
