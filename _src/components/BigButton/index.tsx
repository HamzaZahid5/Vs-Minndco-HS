/**
 * GENERIC PURPLE BUTTON AND ITS VARIANTS USED ACROSS THE APP
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ButtonProps, ViewStyle } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from 'color';

import { CustomThemeType } from '../../utils/OriginalTheme';
type Props = {
  variant?: string;
  style?: ViewStyle;
  labelStyle?: ViewStyle;
  onlyPremium?: boolean;
};

const BigButton = ({
  variant = 'default',
  style = {},
  labelStyle = {},
  onlyPremium = false,
  ...props
}: Props & Record<string, unknown>) => {
  const theme = useTheme() as CustomThemeType;
  const bgColor =
    variant === 'link' ? 'transparent' : variant === 'accent' ? theme.colors.accent : theme.colors.background;
  const txtColor =
    variant === 'link' ? theme.colors.placeholder : variant === 'accent' ? theme.colors.background : theme.colors.text;
  return (
    <View>
      <Button
        mode={variant === 'link' ? 'text' : 'outlined'}
        theme={{ roundness: 50 }}
        style={[
          styles.buttonStyles,
          variant === 'link'
            ? {
                shadowColor: 'transparent',
                elevation: 0,
              }
            : null,
          {
            backgroundColor: props.disabled
              ? Color(bgColor).lighten(0.3).toString()
              : onlyPremium
              ? Color(theme.colors.warning).lighten(0.3).toString()
              : bgColor,
          },
          style,
        ]}
        contentStyle={styles.contentStyle}
        labelStyle={[
          styles.labelStyle,
          {
            color: props.disabled ? Color(txtColor).alpha(0.5).toString() : txtColor,
          },
          variant === 'link' ? styles.linkLabelStyle : null,
          labelStyle,
        ]}
        uppercase={false}
        {...props}
      />
      {onlyPremium && (
        <View style={styles.crownWrapper}>
          <Icon size={20} color="purple" name="crown" />
        </View>
      )}
    </View>
  );
};

BigButton.propTypes = {
  variant: PropTypes.string,
  style: PropTypes.object,
  labelStyle: PropTypes.object,
  onlyPremium: PropTypes.bool,
};

export default BigButton;

const ICON_SIZE = 30;
const styles = StyleSheet.create({
  buttonStyles: {
    // borderWidth: 0,
    marginBottom: 34,
    shadowColor: '#664AB9',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 2,
    borderColor: 'transparent',
  },
  contentStyle: {
    height: 40,
  },
  labelStyle: {
    color: 'white',
    fontSize: 16,
    lineHeight: 16,
    marginHorizontal: 25,
    letterSpacing: -0.2,
  },
  crownWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: -5,
    paddingLeft: 1,
    zIndex: 10,
    // backgroundColor: theme.customs.colors.warning,
    borderRadius: ICON_SIZE / 2,
    width: ICON_SIZE,
    height: ICON_SIZE,
    transform: [{ rotate: '15deg' }],
    elevation: 2,
  },
  linkLabelStyle: {
    // color: theme.colors.accent,
    width: '100%',
    textDecorationLine: 'underline',
  },
});
