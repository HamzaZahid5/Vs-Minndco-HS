import React, { useEffect, useState } from 'react';
import storage from './storage';

export const useStorageDownloadURL = (path = '') => {
  const [url, setUrl] = useState();
  const getAndSaveDownloadUrl = async () => {
    try {
      const remoteUrl = await storage()
        .ref(path)
        .getDownloadURL();
      setUrl(remoteUrl);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    if(path !== '') {
      getAndSaveDownloadUrl();
    }
  }, [path]);

  return url;
}