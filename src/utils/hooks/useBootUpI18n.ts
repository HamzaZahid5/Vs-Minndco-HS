import { useEffect, useState } from 'react';

import { setI18nConfig } from '../localization';

const useBootUpI18n = () => {
  const [i18nReady, setI18nReady] = useState<boolean>();

  useEffect(() => {
    setI18nConfig(setI18nReady);
  }, []);

  return i18nReady;
};

export default useBootUpI18n;
