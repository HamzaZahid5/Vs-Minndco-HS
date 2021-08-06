import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar, Colors } from 'react-native-paper';
import { useStorageDownloadURL } from '../../services/Storage';

const StorageLoader = ({ path = 'lifesaver/LS_HOME_calm_en.mp3', children }) => {
  const url = useStorageDownloadURL(path);
  return url ? children(url) : <ProgressBar indeterminate color={Colors.blue800} />;
};

StorageLoader.propTypes = {
  path: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

export default StorageLoader;
