import { useState } from 'react';

const getWebOrientation = () => {
  const orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
  switch (orientation) {
    case 'portrait-primary':
    default:
      return 'PORTRAIT';
    case 'landscape-primary':
      return 'LANDSCAPE';
  }
};

const useOrientation = () => {
  const [currentOrientation] = useState(getWebOrientation());

  //@TODO implement orientation change

  return currentOrientation;
};

export default useOrientation;
