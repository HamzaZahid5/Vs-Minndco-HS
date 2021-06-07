import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export default () => {
  const [fontsLoaded, setFontsLoaded] = useState();
  const loadFonts = async () => {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      'Graphik-Regular': require('../../../assets/fonts/Graphik-Regular/Graphik-Regular.ttf'),
      'Graphik-Medium': require('../../../assets/fonts/Graphik-Medium/Graphik-Medium.ttf'),
      'Graphik-Light': require('../../../assets/fonts/Graphik-Light/Graphik-Light.ttf'),
      'Graphik-Bold': require('../../../assets/fonts/Graphik-Bold/Graphik-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return [fontsLoaded];
};
