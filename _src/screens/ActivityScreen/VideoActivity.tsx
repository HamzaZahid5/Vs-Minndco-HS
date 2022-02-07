import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Headline, IconButton, Title, Paragraph, Divider, useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import VideoPlayer from '../../components/VideoPlayer';
import BigButton from '../../components/BigButton';
// @ts-ignore: non-ts file
import { getTipsByActivityType, getIconByActivityType } from '../../utils/helpers';
import { useStorageDownloadURL } from '../../services/Storage';
import { activityType } from '../../../types';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';
import AnalyticEvent from '../../utils/AnalyticsEvent';

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
          <View style={{ marginTop: 20, height: 40 }}>
            <BigButton
              variant="accent"
              onPress={() => {
                AnalyticEvent('video_start', { video_type: '2d', video_id: storeAsset });
                setAction('PLAY_VIDEO');
              }}
            >
              {translate('commons.general.start')}
            </BigButton>
          </View>
        </>
      )}
      {action === 'PLAY_VIDEO' && (
        <VideoPlayer
          videoURI={assetURI}
          didJustFinish={() => {
            AnalyticEvent('video_end', { video_type: '2d', video_id: storeAsset });
            onComplete();
          }}
        />
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
      ...theme.fontsHelper.heading1,
      color: theme.colors.backdrop, // '#fffc',
    },
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
        <Title style={[styles.title, { ...theme.fonts.small, color: theme.colors.backdrop }]}>
          {duration}
          {' min.'}
        </Title>
        <Paragraph style={[styles.description, , { ...theme.fonts.small, color: theme.colors.text }]}>
          {description}
        </Paragraph>
      </View>
      <Divider
        style={{
          marginTop: 24,
          backgroundColor: theme.colors.backdrop,
        }}
      />
      <View style={styles.content}>
        <Title style={[styles.title, { color: theme.colors.backdrop }]}>
          {translate('screens.Activity.tipsTitle')}
        </Title>
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
      marginTop: 20,
    },
    activityIcon: {
      margin: 0,
      marginBottom: 24,
      padding: 0,
    },
    title: {
      textTransform: 'uppercase',
    },
    description: {},
  });
