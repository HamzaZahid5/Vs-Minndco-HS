import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, FAB, Badge } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MindCoFAABButton = ({
  icon = 'crown',
  informativeText = '',
  onPress = () => false,
  showAlert = false,
  testID = 'fabbutton',
}) => {
  const [triggerOnce, lockTrigger] = useState(false);
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <>
      <View style={styles.mainContainer} testID={testID}>
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
      <Badge style={styles.menuItemBadge} size={15} visible={showAlert} testID={`${testID}-badge`} />
    </>
  );
};

MindCoFAABButton.propTypes = {
  icon: PropTypes.string,
  informativeText: PropTypes.string,
  onPress: PropTypes.func,
  showAlert: PropTypes.bool,
  testID: PropTypes.string,
};

export default MindCoFAABButton;

const getStyles = theme =>
  StyleSheet.create({
    mainContainer: {
      marginVertical: 20,
      marginHorizontal: 20,
      zIndex: 0,
    },
    defaulFAB: {},
    infoText: {
      color: theme.colors.placeholder,
      textAlign: 'center',
      marginTop: 5,
    },
    menuItemBadge: {
      position: 'absolute',
      backgroundColor: '#cc1100',
      right: 18,
      top: 20,
      zIndex: 100,
    },
  });
