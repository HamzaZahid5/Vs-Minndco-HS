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
    testID={`input-component-${props.testID}`}
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
            error: '#B22D1D',
          },
        }
      }
      underlineColor="white"
      textAlign={'center'}
      {...props}
    />
    <HelperText type="error" visible={error !== null} style={{ color: '#B22D1D' }} testID="error-helper">
      {error}
    </HelperText>
  </View>
);

TextInputStyled.propTypes = {
  overrideTheme: PropTypes.bool,
  error: PropTypes.string,
  containerStyle: PropTypes.object,
  testID: PropTypes.string,
};

export default TextInputStyled;
