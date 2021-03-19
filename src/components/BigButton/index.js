/**
 * GENERIC PURPLE BUTTON AND ITS VARIANTS USED ACROSS THE APP
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, withTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import theme from './../../styles/BasicNewTheme';
import Color from 'color';

export default withTheme(
  ({
    theme,
    variant = 'default',
    style,
    labelStyle = {},
    onlyPremium = false,
    ...props
  }) => (
    <View>
      <Button
        mode={variant === 'link' ? 'default' : 'outlined'}
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
            // backgroundColor: props.disabled
            //   ? variant === 'accent'
            //     ? theme.customs.colors.MediumPurple
            //     : theme.customs.colors.LightConcrete
            //   : variant === 'accent'
            //   ? theme.customs.colors.Purple
            //   : onlyPremium
            //   ? Color(theme.customs.colors.warning)
            //       .lighten(0.3)
            //       .toString()
            //   : '#ffffff',
          },
          style,
        ]}
        contentStyle={styles.contentStyle}
        labelStyle={[
          styles.labelStyle,
          {
            // color: props.disabled
            //   ? variant === 'default'
            //     ? Color(theme.customs.colors.Concrete)
            //         .alpha(0.5)
            //         .toString()
            //     : Color(theme.customs.colors.White)
            //         .alpha(0.5)
            //         .toString()
            //   : variant === 'default'
            //   ? theme.customs.colors.Concrete
            //   : theme.customs.colors.White,
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
  ),
);
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
