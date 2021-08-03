import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import GenericPageLayout from '../../components/GenericPageLayout';
import ScreenDecorator from '../../components/ScreenDecorator';
import BigButton from '../../components/BigButton';
import Row from './DetailRow';
import { auth } from '../../services/Auth';
import config from './../../../env';
import { useSelector } from 'react-redux';

const Profile = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const email = useSelector(store => store.user.auth.email);
  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        header={
          <View style={styles.hero}>
            <Avatar.Text labelStyle={styles.avatarLabel} size={100} label={'M'} />
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
            onPress={() => Linking.openURL('https://app.relief.the-mind.company/dlinks/test')}
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

const getStyles = theme =>
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
