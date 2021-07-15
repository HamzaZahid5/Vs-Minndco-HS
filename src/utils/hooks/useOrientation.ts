import { useEffect, useState } from 'react';

import Orientation, { orientation } from 'react-native-orientation';

const useOrientation = () => {
  const [currentOrientation, setOrientation] = useState(Orientation.getInitialOrientation());

  const onOrientationChange = (newOrientation: orientation) => {
    setOrientation(newOrientation);
  };

  useEffect(() => {
    Orientation.addOrientationListener(onOrientationChange);
    return () => Orientation.removeOrientationListener(onOrientationChange);
  }, []);

  return currentOrientation;
};

export default useOrientation;
