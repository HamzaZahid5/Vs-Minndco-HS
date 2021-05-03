import React from 'react';
import { ProgressBar, Colors } from 'react-native-paper';
import { useStorageDownloadURL } from '../../services/Storage';

export default ({ path = 'lifesaver/LS_HOME_calm_en.mp3', children }) => {
  const url = useStorageDownloadURL(path);
  return url ? children(url) : <ProgressBar indeterminate color={Colors.blue800} />
}