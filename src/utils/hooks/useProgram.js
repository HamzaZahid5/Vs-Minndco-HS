import { useEffect, useState } from 'react';
import storage from '../../services/Storage';
// import { getLocale } from '../utils/localization';

let localData = null;
const getProgramFile = async (programName = 'quests') => {
  let url;
  try {
    url = await storage().ref().child(`program/${programName}.json`).getDownloadURL();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  try {
    const response = await fetch(url);
    return response.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

// @TODO move file name to config
// const getProgramFileByLocale = locale => `quests_8.4.1_${locale}`;
const getProgramFileByLocale = () => 'program_0.1.0_en';

const useProgram = programName => {
  const [program, setProgram] = useState(localData);
  // const [locale] = useState(getLocale());

  const load = async () => {
    const name = programName || getProgramFileByLocale();
    const data = await getProgramFile(name);
    setProgram(data);
    localData = data;
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
