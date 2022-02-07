import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';
// @ts-ignore: non-ts file
import GenericPageLayout from '../../components/GenericPageLayout';
import BigButton from '../../components/BigButton';
// @ts-ignore: non-ts file
import ScreenDecorator from '../../components/ScreenDecorator';
import useVRPlayerCTA, { VRPlayerCTAPropType } from '../../utils/hooks/useVRPlayerCTA';
import { DefaultScreenPropType } from '../../../types';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';
import Loading from '../../components/Loading';

const KitAssemble = ({ navigation }: DefaultScreenPropType<'KitAssemble'>) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef<YoutubeIframeRef | null>(null);
  const [loading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(true);
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      playerRef.current?.seekTo(0, false);
    }
    if (state === 'unstarted' || state === 'buffering') {
      setBuffering(buffering => (buffering ? buffering : true));
    } else {
      setBuffering(buffering => (buffering ? false : buffering));
    }
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  const resourceId = 'contents/00_welcome_to_relief_EN.mp4';
  const openVRPlayer = useVRPlayerCTA({
    resourceId,
    onCancel: () => {
      // eslint-disable-next-line no-console
      console.log('cancel');
      navigation.navigate('Main');
    },
    onComplete: () => {
      // eslint-disable-next-line no-console
      console.log('complete');
      navigation.navigate('Main');
    },
  } as VRPlayerCTAPropType);

  return (
    <ScreenDecorator>
      {/*onClose={() => navigation.popTo('Main')}  Here popTo does not exist in react navigation, it a wix navigation feature*/}
      <GenericPageLayout
        onClose={() => navigation.popToTop()}
        fullScroll
        header={
          <View style={styles.hero}>
            {/*width={'auto'} Strings are not allowed in width prop, same as undefined */}
            <View style={StyleSheet.absoluteFillObject}>
              <YoutubePlayer
                ref={playerRef}
                height={232}
                play={playing}
                initialPlayerParams={{ controls: false, modestbranding: true }}
                videoId={'Keh3svyVAwo'}
                onChangeState={onStateChange}
                onReady={() => setLoading(false)}
              />
            </View>
            {(buffering === true || loading === true) && (
              <View pointerEvents="none" style={styles.loading}>
                <Loading iconSize={45} iconStyle={{ backgroundColor: '#00000070' }} />
              </View>
            )}
          </View>
        }
      >
        <View style={styles.contentWrapper}>
          {/*<Paragraph style={styles.description}> description style does not exist*/}
          <Paragraph>{translate('screens.KitAssemble.vr-guiade')}</Paragraph>
          <View style={{ width: '100%', marginTop: 40, alignItems: 'center' }}>
            <BigButton
              style={{
                marginBottom: 20,
              }}
              onPress={openVRPlayer}
            >
              {translate('screens.KitAssemble.load-vr-met')}
            </BigButton>
          </View>
        </View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

KitAssemble.propTypes = {
  navigation: PropTypes.object,
};

export default KitAssemble;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    hero: {
      height: '100%',
      justifyContent: 'center',
    },
    loading: {
      display: 'flex',
      position: 'relative',
      zIndex: 999,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    floatingImageContent: {
      height: '100%',
    },
    heroContent: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headline: {
      ...theme.fonts.headline3,
      // fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
    contentWrapper: {
      width: '100%',
      height: '100%',
      marginVertical: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      // alignItems: 'flex-start',
    },
    itemOption: {
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      width: 78,
      borderRadius: 4,
      padding: 5,
      shadowColor: '#664AB9',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
      minWidth: '45%',
      margin: '2.5%',
    },
    optionText: {
      ...theme.fonts.small,
      // fontWeight: 'bold',
      color: 'white',
      marginTop: 5,
    },
  });
