import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const HeaderKitActivated = ({ onVote }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Text>Congratulations!</Text>
      <View style={styles.main}>
        <Text>VR videos are now part of the main program among other activities.</Text>
      </View>
    </View>
  );
};

HeaderKitActivated.propTypes = {
  onVote: PropTypes.func,
};

export default HeaderKitActivated;

const getStyles = theme =>
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
