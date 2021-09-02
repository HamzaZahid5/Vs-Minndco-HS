import { useEffect, useState } from 'react';
import crashlytics from '../../services/Crashlytics';
import { useStorageDownloadURL } from '../../services/Storage';
import { getLocale } from '../localization';
// import { getLocale } from '../utils/localization';

let localData = null;

// @TODO move file name to config
// const getProgramFileByLocale = locale => `quests_8.4.1_${locale}`;
const getProgramFileByLocale = () => {
  const lang = getLocale();
  return `program_0.1.0_${lang}`;
};

const useProgram = programName => {
  const [program, setProgram] = useState(localData);
  const [programFile, setProgramFile] = useState();
  const downloadUrl = useStorageDownloadURL(programFile ? `program/${programFile}.json` : undefined);

  const dowloadProgram = async url => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setProgram(data);
      localData = data;
    } catch (e) {
      crashlytics().recordError(e);
    }
  };
  useEffect(() => {
    if (downloadUrl) {
      dowloadProgram(downloadUrl);
    }
  }, [downloadUrl]);

  const load = async () => {
    const name = programName || getProgramFileByLocale();
    setProgramFile(name);
  };

  useEffect(() => {
    load();
    return () => false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programName]);

  return program;
};
// to use it from non React components
export const getProgram = () => localData;

export default useProgram;
