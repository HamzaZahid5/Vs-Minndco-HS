import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import crashlytics from '../../services/Crashlytics';
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
import { AUTH_INFO, USER_SUPPORT_PROFILE } from '../../store/selectors';
import { translate } from '../../utils/localization';

const Profile = () => {
  const theme = useTheme() as CustomThemeType;
  const [debugCount, incrementDebugCount] = useState(0);
  const styles = getStyles(theme);
  const { email } = useSelector(AUTH_INFO);
  const { display_name } = useSelector(USER_SUPPORT_PROFILE);
  useEffect(() => {
    if (debugCount === 10) {
      crashlytics().crash();
    }
  }, [debugCount]);

  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        header={
          <View style={styles.hero}>
            <Avatar.Text size={100} label={display_name.substr(0, 2)} />
          </View>
        }
      >
        <View style={styles.bodyContainer}>
          <Row label={translate('screens.Profile.email')} text={email} />
        </View>

        <View style={styles.footer}>
          <BigButton
            variant="link"
            onPress={() => {
              auth().signOut();
            }}
          >
            {translate('screens.Profile.sign-out')}
          </BigButton>
          <Text style={styles.app_version}>
            v{config.APP_VERSION} {debugCount > 5 ? debugCount : ''}
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
