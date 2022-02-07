/**
 * SMALL VERSION OF GENERIC BUTTON TO USE INLINE LOKE INTO PROFILE SCREEN
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChipButton = ({ onlyPremium = false, testID, ...props }) => {
  const theme = useTheme();
  const { labelStyle, contentStyle, style, disabled, ...moreProps } = props;
  const Wrapper = disabled
    ? ({ children }) => <View>{children}</View>
    : ({ children }) => <TouchableOpacity onPress={props.onPress}>{children}</TouchableOpacity>;
  return (
    <Wrapper>
      <Button
        mode="outlined"
        compact
        uppercase={false}
        theme={{ roundness: 50, colors: { primary: '#ffffff' } }}
        style={[styles.chipButton, style]}
        contentStyle={[styles.chipButtonContent, contentStyle]}
        labelStyle={[styles.chipButtonLabel, { color: theme.colors.darker }, labelStyle]}
        disabled={disabled}
        {...moreProps}
        testID={testID}
      />
      {onlyPremium && (
        <View
          style={[
            styles.crownWrapper,
            {
              backgroundColor: theme.colors.warning,
            },
          ]}
        >
          <Icon size={20} color={theme.colors.accent} name="crown" />
        </View>
      )}
    </Wrapper>
  );
};

ChipButton.propTypes = {
  onlyPremium: PropTypes.bool,
  labelStyle: PropTypes.object,
  contentStyle: PropTypes.object,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  testID: PropTypes.string,
};

export default ChipButton;

const ICON_SIZE = 25;
const styles = StyleSheet.create({
  chipButton: {
    height: 28,
    marginLeft: 10,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  chipButtonContent: { marginTop: 0 },
  chipButtonLabel: {
    fontSize: 10,
    lineHeight: 10,
    height: 15,
  },
  crownWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -ICON_SIZE / 4,
    top: -ICON_SIZE / 4,
    paddingLeft: 1,
    zIndex: 10,
    borderRadius: ICON_SIZE / 2,
    width: ICON_SIZE,
    height: ICON_SIZE,
    transform: [{ rotate: '15deg' }],
  },
});
