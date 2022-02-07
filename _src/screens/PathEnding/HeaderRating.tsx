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

const HeaderRating = ({ asset = '' }) => {
  const [vote, setVote] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const { voteRating } = useValuationActions();

  useEffect(() => {
    if (vote > 0) {
      onVote(vote);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote]);

  const onVote = (rate: 0 | 1 | 2 | 3 | 4 | 5) => {
    voteRating(asset, rate);
  };

  const theme = useTheme() as CustomThemeType;
  const styles = getStyles(theme);
  const starChar = Platform.OS === 'ios' ? '★' : '⭐️';
  return (
    <View style={styles.pollContainer} testID="path-endind-header-rating">
      <Headline style={{ textAlign: 'center' }}>{translate('screens.PathEnding.how-usefull')}</Headline>
      <View style={styles.options}>
        <Pressable style={{}} onPress={() => setVote(1)}>
          <Text style={[styles.star, vote < 1 ? styles.unselected : styles.selected]}>{starChar}</Text>
        </Pressable>
        <Pressable style={{}} onPress={() => setVote(2)}>
          <Text style={[styles.star, vote < 2 ? styles.unselected : styles.selected]}>{starChar}</Text>
        </Pressable>
        <Pressable style={{}} onPress={() => setVote(3)}>
          <Text style={[styles.star, vote < 3 ? styles.unselected : styles.selected]}>{starChar}</Text>
        </Pressable>
        <Pressable style={{}} onPress={() => setVote(4)}>
          <Text style={[styles.star, vote < 4 ? styles.unselected : styles.selected]}>{starChar}</Text>
        </Pressable>
      </View>
      <FadeEffect show={vote > 0}>
        <Text style={styles.title}>{translate('screens.PathEnding.thanks-for-voting')}</Text>
      </FadeEffect>
    </View>
  );
};

HeaderRating.propTypes = {
  asset: PropTypes.string,
};

export default HeaderRating;

const getStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    pollContainer: {
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginHorizontal: 20,
    },
    options: {
      flexDirection: 'row',
    },
    star: {
      fontSize: 30,
      margin: 5,
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
