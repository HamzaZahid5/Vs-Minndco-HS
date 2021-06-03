/**
 * A TEXT INPUT FIELD WITH DESIGN TO REUSE IN EVERY FORM (LEGACY UI STYLE)
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
const TextInputStyled = ({ overrideTheme, error, containerStyle = {}, ...props }) => (
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
            placeholder: 'white',
          },
        }
      }
      underlineColor="white"
      textAlign={'center'}
      {...props}
    />
    <HelperText type="error" visible={error !== null}>
      {error}
    </HelperText>
  </View>
);

TextInputStyled.propTypes = {
  overrideTheme: PropTypes.bool,
  error: PropTypes.string,
  containerStyle: PropTypes.object,
};

export default TextInputStyled;
