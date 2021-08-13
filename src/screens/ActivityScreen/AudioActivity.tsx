import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Headline, IconButton, Title, Paragraph, Divider, useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import AudioPlayer from '../../components/AudioPlayer';
import BigButton from '../../components/BigButton';
// @ts-ignore: non-ts file
import { getTipsByActivityType, getIconByActivityType } from '../../utils/helpers';
import { useStorageDownloadURL } from '../../services/Storage';
import { activityType } from '../../../types';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';

export const Header = ({
  onComplete,
  storeAsset,
  title,
}: {
  onComplete: (anwser?: string) => void;
  storeAsset: string;
  title: string;
}) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getHeaderStyles(theme);
  const [action, setAction] = useState('INIT');
  const assetURI = useStorageDownloadURL(storeAsset);

  return (
    <>
      {action === 'INIT' && (
        <>
          <Headline style={styles.headline}>{title}</Headline>
          <View style={styles.headView}>
            <BigButton variant="accent" onPress={() => setAction('PLAY')}>
              {translate('commons.general.start')}
            </BigButton>
          </View>
        </>
      )}
      {action === 'PLAY' && (
        <View style={styles.actionView}>
          <AudioPlayer
            audioURI={assetURI}
            didJustFinish={onComplete}
            // src="https://firebasestorage.googleapis.com/v0/b/mindcotine-v4-production.appspot.com/o/lifesaver%2FAudio_VAS_1_EN.mp3?alt=media&token=59841ed4-446e-4b0f-b168-e0a1f3f1f938"
          />
        </View>
      )}
    </>
  );
};

Header.propTypes = {
  onComplete: PropTypes.func,
  storeAsset: PropTypes.string,
  title: PropTypes.string,
};

const getHeaderStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    headline: {
      ...theme.fonts.headline,
      // fontWeight: 'bold',
      color: 'white',
    },
    headView: { marginTop: 20, height: 40 },
    actionView: { flex: 1, width: '100%' },
  });

export const Body = ({ type, duration, description }: activityType) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getBodyStyles(theme);
  return (
    <>
      <View style={[styles.content]}>
        <IconButton
          icon={getIconByActivityType(type)}
          size={30}
          color="white"
          style={[styles.activityIcon, { backgroundColor: theme.colors.accent }]}
        />
        <Title style={[styles.title, { ...theme.fonts.small, color: theme.colors.text }]}>
          {duration}
          {' min.'}
        </Title>
        <Paragraph style={[styles.description, { ...theme.fonts.small, color: theme.colors.backdrop }]}>
          {description}
        </Paragraph>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.content}>
        <Title style={styles.title}>{translate('screens.Activity.tipsTitle')}</Title>
        <Paragraph style={styles.description}>{getTipsByActivityType(type)}</Paragraph>
      </View>
    </>
  );
};

Body.propTypes = {
  type: PropTypes.string,
  duration: PropTypes.string,
  description: PropTypes.string,
};

const getBodyStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    content: {
      marginHorizontal: 4,
    },
    activityIcon: {
      margin: 0,
      marginBottom: 24,
      padding: 0,
    },
    title: {
      // fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    description: {},
    divider: {
      marginTop: 24,
      backgroundColor: theme.colors.backdrop,
    },
  });
