import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { translate } from '../../utils/localization';

const HeaderKitActivated = ({ onVote }: { onVote: () => void }) => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <Text>{translate('Congratulations!')}</Text>
      <View style={styles.main}>
        <Text>{translate('VR videos are now part of the main program among other activities.')}</Text>
      </View>
    </View>
  );
};

HeaderKitActivated.propTypes = {
  onVote: PropTypes.func,
};

export default HeaderKitActivated;

const getStyles = () =>
  StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    main: {
      flexDirection: 'row',
    },
  });
