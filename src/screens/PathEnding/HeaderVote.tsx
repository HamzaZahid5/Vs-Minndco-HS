import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Headline, useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import useValuationActions from '../../appActionHooks/useValuationActions';
import FadeEffect from '../../components/FadeEffect';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';

const HeaderVote = ({ asset = '' }) => {
  const [vote, setVote] = useState<-1 | 0 | 1>(-1);
  const { voteYesNo } = useValuationActions();

  useEffect(() => {
    //Check here, negative votes wont be sent
    if (vote >= 0) {
      onVote(vote);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote]);

  const onVote = (rate: -1 | 0 | 1) => {
    voteYesNo(asset, rate);
  };

  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  const charVoteYes = Platform.OS === 'ios' ? translate('commons.general.yes').toUpperCase() : '👍';
  const charVoteNo = Platform.OS === 'ios' ? translate('commons.general.no').toUpperCase() : '👎';
  return (
    <View style={styles.pollContainer} testID="path-endind-header-vote">
      <Headline style={{ textAlign: 'center' }}>{translate('screens.PathEnding.useful-activity')}</Headline>
      <View style={styles.options}>
        <Pressable style={{}} onPress={() => setVote(0)}>
          <Text
            style={[
              styles.icon,
              Platform.OS === 'android' ? styles.flipH : null,
              vote === 0 ? styles.selected : styles.unselected,
            ]}
          >
            {charVoteNo}
          </Text>
        </Pressable>
        <Text style={[styles.icon]}>-</Text>
        <Pressable style={{}} onPress={() => setVote(1)}>
          <Text style={[styles.icon, vote === 1 ? styles.selected : styles.unselected]}>{charVoteYes}</Text>
        </Pressable>
      </View>
      <FadeEffect show={vote >= 0}>
        <Text style={styles.title}>{translate('screens.PathEnding.thanks-for-voting')}</Text>
      </FadeEffect>
    </View>
  );
};

HeaderVote.propTypes = {
  asset: PropTypes.string,
};

export default HeaderVote;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    pollContainer: {
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom: 20,
    },
    options: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 30,
    },
    icon: {
      fontSize: 30,
      margin: 5,
    },
    flipH: {
      transform: [{ scaleX: -1 }],
    },
    selected: {
      fontSize: 35,
      color: 'gold',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 1,
    },
    unselected: {
      fontSize: 35,
      color: Platform.OS === 'ios' ? 'black' : 'transparent',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 1,
    },
    title: {
      ...theme.fontsHelper.large,
    },
  });
