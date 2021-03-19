/**
 * A TEXT INPUT FIELD WITH DESIGN TO REUSE IN EVERY FORM (LEGACY UI STYLE)
 */
import React from 'react';
import { View } from 'react-native';
import { TextInput, HelperText, withTheme } from 'react-native-paper';
export default withTheme(
  ({ theme, overrideTheme, error, containerStyle = {}, ...props }) => (
    <View
      style={{
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        ...containerStyle,
      }}
    >
      <TextInput
        selectionColor="white"
        error={error}
        theme={
          overrideTheme || {
            roundness: 0,
            colors: {
              background: 'transparent',
              primary: 'white',
              text: 'white',
              placeholder: "gray",
            },
          }
        }
        underlineColor="gray"
        textAlign={'center'}
        {...props}
      />
      <HelperText type="error" visible={error !== null}>
        {error}
      </HelperText>
    </View>
  ),
);
