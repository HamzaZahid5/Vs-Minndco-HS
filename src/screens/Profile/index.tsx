import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import GenericPageLayout from '../../components/GenericPageLayout';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
import BigButton from '../../components/BigButton';
import Row from './DetailRow';
// @ts-ignore: non-ts file
import { auth } from '../../services/Auth';
// @ts-ignore: non-ts file
import config from './../../../env';
import { useSelector } from 'react-redux';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { AUTH_INFO } from '../../store/selectors';

const Profile = () => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  const { email } = useSelector(AUTH_INFO);
  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        header={
          <View style={styles.hero}>
            <Avatar.Text size={100} label={'M'} />
          </View>
        }
      >
        <View style={styles.bodyContainer}>
          <Row label="Email" text={email} />
        </View>

        <View style={styles.footer}>
          <BigButton
            variant="link"
            onPress={() => {
              auth().signOut();
            }}
          >
            Sign out
          </BigButton>
          <Text
            // onPress={() => incrementDebugCount(debugCount + 1)}
            style={styles.app_version}
          >
            v{config.APP_VERSION}
          </Text>
        </View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

export default Profile;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    hero: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bodyContainer: {
      // backgroundColor: '#f00a',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    bodyTitle: {
      ...theme.fonts.heading2,
      color: theme.colors.dark,
    },
    footer: {
      marginVertical: 20,
      justifyContent: 'center',
    },
    app_version: {
      ...theme.fonts.thin,
      color: theme.colors.text,
      display: 'flex',
      textAlign: 'center',
    },
  });
