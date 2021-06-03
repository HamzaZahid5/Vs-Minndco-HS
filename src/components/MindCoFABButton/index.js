import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, FAB } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MindCoFAABButton = ({ icon = 'crown', informativeText = '', onPress = () => false }) => {
  const [triggerOnce, lockTrigger] = useState(false);
  const theme = useTheme();
  return (
    <View style={styles.mainContainer}>
      <FAB
        style={[styles.defaulFAB, { backgroundColor: theme.colors.background }]}
        icon={icon}
        iconSize={35}
        color={theme.colors.secondary}
        onPress={() => {
          if (triggerOnce) {
            return;
          }
          onPress();
          lockTrigger(true);
          setTimeout(() => lockTrigger(false), 1000);
        }}
      />

      <Text style={styles.infoText}>{informativeText}</Text>
    </View>
  );
};

MindCoFAABButton.propTypes = {
  icon: PropTypes.string,
  informativeText: PropTypes.string,
  onPress: PropTypes.func,
};

export default MindCoFAABButton;

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  defaulFAB: {},
  infoText: {},
});
