import React from 'react';
import { useTheme } from 'react-native-paper';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ anyPendingNotification = false, onPress }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Icon style={{ marginBottom: 0, marginLeft: 0 }} name="menu" size={30} color={theme.colors.seconday} />
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
