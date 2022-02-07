/**
 * GENERIC POPUP WINDOW, USED TO WARN ABOUT MISSING JOURNAL FILL-IN OR QUIT DATE CONGRATS.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import BigButton from '../BigButton';
import { IconButton, Paragraph, Dialog, Portal, useTheme } from 'react-native-paper';

const DefaultDialog = ({
  show,
  onClose = _ => _,
  onButtonPress,
  icon = 'calendar',
  title,
  text,
  content,
  buttons = [],
  testID = 'default-dialog',
}) => {
  const theme = useTheme();
  return (
    // <Portal>
    <Dialog visible={show} onDismiss={onClose} style={styles.dialogContainer}>
      <View style={styles.iconContainer}>
        <IconButton icon={icon} color="white" size={35} style={styles.icon} />
      </View>
      <IconButton
        icon="close"
        color={theme.colors.MediumConcrete}
        size={20}
        style={styles.closeButton}
        onPress={onClose}
        testID={testID + '-close'}
      />
      <Dialog.Title
        style={[
          styles.dialogTitle,
          {
            color: theme.colors.backdrop,
            ...theme.fonts.medium,
          },
        ]}
      >
        {title}
      </Dialog.Title>
      <Dialog.Content>{content || <Paragraph style={styles.dialogParagraph}>{text}</Paragraph>}</Dialog.Content>
      <Dialog.Actions style={styles.action}>
        {buttons.map((b, i) => (
          <BigButton
            key={b.id || Math.random()}
            variant={b.default || buttons.length === 1 ? 'accent' : 'outlined'}
            style={styles.acceptButton}
            labelStyle={[
              b.default || buttons.length === 1 ? { color: theme.colors.background } : { color: theme.colors.backdrop },
            ]}
            onPress={() => onButtonPress({ [b.id || 'default']: true })}
            testID={b.id ? testID + '-' + b.id : `${testID}-button-${i}`}
          >
            {b.label}
          </BigButton>
        ))}
      </Dialog.Actions>
    </Dialog>
    // </Portal>
  );
};

DefaultDialog.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onButtonPress: PropTypes.func,
  icon: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  content: PropTypes.object,
  buttons: PropTypes.array,
  testID: PropTypes.string,
};

export default DefaultDialog;

const styles = StyleSheet.create({
  dialogContainer: {
    // marginTop: '80%',
    backgroundColor: 'white',
    // top: '20%',
    paddingTop: 22,
  },
  iconContainer: {
    width: '100%',
    position: 'absolute',
    top: -35,
    alignItems: 'center',
  },
  icon: {
    backgroundColor: '#FECA45',
    // backgroundColor: '#f007',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  accentLabel: {
    // color: theme.colors.White,
  },
  outlinedLabel: {
    // color: theme.colors.Concrete,
  },
  dialogTitle: {
    textAlign: 'center',
    // color: theme.colors.Concrete,
    marginBottom: 0,
  },
  dialogParagraph: {
    // ...theme.fonts.medium,
    // ...theme.fonts.small,
    textAlign: 'center',
    // color: theme.colors.Concrete,
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  acceptButton: { marginBottom: 15 },
});
