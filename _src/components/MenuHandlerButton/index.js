import React from 'react';
import PropTypes from 'prop-types';
import { useTheme, Badge } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from 'color';

const MenuHandlerButton = ({ anyPendingNotification = false, onPress, testID }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity testID={testID ?? 'open-drawer-button'} onPress={onPress}>
      <Icon
        style={{ marginBottom: 0, marginLeft: 0 }}
        name="menu"
        size={30}
        color={Color(theme.colors.dark).darken(0.3).toString()}
      />
      {anyPendingNotification && (
        <Badge
          size={15}
          style={{
            position: 'absolute',
            top: 0,
            left: 25,
            backgroundColor: '#cc1100',
          }}
        />
      )}
    </TouchableOpacity>
  );
};

MenuHandlerButton.propTypes = {
  anyPendingNotification: PropTypes.bool,
  onPress: PropTypes.func,
  testID: PropTypes.string,
};

export default MenuHandlerButton;
