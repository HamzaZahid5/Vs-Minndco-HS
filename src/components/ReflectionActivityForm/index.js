/**
 * QUESTION FORM USED INTO PROGRAM ACTIVITY SCREEN. ONE OF MANY OPTIONS LIKE VR, 2D VIDEO AND AUDIO
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Title, Snackbar, useTheme } from 'react-native-paper';
import TextInputStyled from './../TextInputStyled';
import BigButton from './../BigButton';
import { translate } from '../../utils/localization';

const validateInput = form => {
  return (form.answer || '').trim() === '' ? [translate('commons.messages.uncompletedField')] : [];
};

const ActivityPlayerReflectionForm = ({ onEnd = null, question = '' }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [state, setState] = useState({});
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const handleTextChange = value => {
    setState({ ...state, answer: value });
  };
  const onFormSubmit = () => {
    setSubmitting(true);
    const errors = validateInput(state);
    if (errors.length) {
      setErrors(errors);
    } else {
      onEnd(state.answer);
    }
    setSubmitting(false);
  };
  return (
    <>
      <View style={styles.content}>
        <Title style={styles.title}>{question}</Title>
        <TextInputStyled
          multiline
          placeholder={translate('screens.Activity.answer-placeholder')}
          mode="outlined"
          value={state.othertext}
          onChangeText={handleTextChange}
          style={{ width: '100%' }}
          returnKeyLabel="Submit"
          textAlignVertical="top"
          numberOfLines={4}
          overrideTheme={{
            roundness: 5,
            colors: {
              background: 'transparent',
              primary: theme.colors.backdrop,
              text: theme.colors.backdrop,
              placeholder: theme.colors.backdrop,
            },
          }}
        />
      </View>
      <View style={styles.ctaWrapper}>
        <BigButton variant="accent" onPress={onFormSubmit} disabled={submitting} loading={submitting}>
          {submitting ? translate('screens.Activity.submitting') : translate('screens.Activity.submit')}
        </BigButton>
      </View>
      <Snackbar
        style={{ flex: 1, position: 'absolute', bottom: 40 }}
        visible={errors.length}
        duration={Snackbar.DURATION_SHORT}
        onDismiss={() => setErrors([])}
        theme={{
          colors: {
            onSurface: theme.colors.text,
            surface: theme.colors.border,
          },
        }}
        action={{
          // label: translate('commons.messages.close'),
          onPress: () => {
            // Do something
          },
        }}
      >
        {[...errors].pop()}
      </Snackbar>
    </>
  );
};

ActivityPlayerReflectionForm.propTypes = {
  onEnd: PropTypes.func,
  question: PropTypes.string,
};

export default ActivityPlayerReflectionForm;

const getStyles = theme =>
  StyleSheet.create({
    // CONTENT
    content: {
      marginTop: 24,
      marginHorizontal: 4,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    title: {
      ...theme.fonts.small,
      // fontWeight: 'bold',
      color: theme.colors.text,
      textTransform: 'uppercase',
    },
    ctaWrapper: {
      marginTop: 24,
      width: '100%',
      alignItems: 'center',
    },
  });
