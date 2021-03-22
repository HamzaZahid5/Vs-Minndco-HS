import React from 'react';
import { Canvas } from 'react-three-fiber';

export default props => {
  const isDebuggingEnabled = (typeof atob !== 'undefined');
  return isDebuggingEnabled ? null : (
    <Canvas
      {...props}
    />
  )
};
