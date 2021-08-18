import { useState } from 'react';

import Orientation, { OrientationType, useDeviceOrientationChange } from 'react-native-orientation-locker';

const useOrientation = () => {
  const [currentOrientation, setOrientation] = useState<OrientationType>(Orientation.getInitialOrientation());
  useDeviceOrientationChange(setOrientation);

  return currentOrientation;
};

export default useOrientation;
