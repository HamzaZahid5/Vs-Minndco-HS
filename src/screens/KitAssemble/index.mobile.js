import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
import GenericPageLayout from './../../components/GenericPageLayout';
import BigButton from '../../components/BigButton';
import ScreenDecorator from '../../components/ScreenDecorator';

const KitAssemble = ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef();
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      playerRef.current.seekTo(0);
    }
  }, []);
  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <ScreenDecorator>
      <GenericPageLayout
        onClose={() => navigation.popTo('Main')}
        fullScroll
        header={
          <View style={styles.hero}>
            <YoutubePlayer
              ref={playerRef}
              height={232}
              width={'auto'}
              play={playing}
              controls={false}
              modestbranding={true}
              videoId={'Keh3svyVAwo'}
              onChangeState={onStateChange}
            />
          </View>
        }
      >
        <View style={styles.contentWrapper}>
          <Paragraph style={styles.description}>
            {'Follow the steps from the video above. Play, pause, rewind if you need it.\nMake your headset ready to put your phone in it.\n\nNow, press the button below to load your first VR-MET content.'}
          </Paragraph>
          <View style={{ width: '100%', marginTop: 40, alignItems: 'center' }}>
            <BigButton
              style={{
                marginBottom: 20,
              }}
              onPress={() => navigation.push('VRDemo')}
            >
              Load VR-MET
            </BigButton>
          </View>
        </View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

export default KitAssemble;

const getStyles =  theme => StyleSheet.create({
  hero: {
    height: '100%',
    justifyContent: 'center',
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
