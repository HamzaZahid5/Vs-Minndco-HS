import { useState } from 'react';

import Orientation, { OrientationType, useOrientationChange } from 'react-native-orientation-locker';

const useOrientation = () => {
  const [currentOrientation, setOrientation] = useState<OrientationType>(Orientation.getInitialOrientation());
  useOrientationChange(setOrientation);

  return currentOrientation;
};

export default useOrientation;
