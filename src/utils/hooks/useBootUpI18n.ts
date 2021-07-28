import { useEffect, useState } from 'react';
import setI18nConfig from '../i18n';

const useBootUpI18n = () => {
  const [i18nReady, setI18nReady] = useState();

  useEffect(() => {
    setI18nConfig(setI18nReady);
  }, []);

  return i18nReady;
};

export default useBootUpI18n;
