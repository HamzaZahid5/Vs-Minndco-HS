import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Headline, Paragraph, useTheme } from 'react-native-paper';
import useValuationActions from '../../appActionHooks/useValuationActions';
import FadeEffect from '../../components/FadeEffect';

const HeaderVote = ({ asset = '' }) => {
  const [vote, setVote] = useState(-1);
  const { voteYesNo } = useValuationActions();

  useEffect(() => {
    if (vote > 0) {
      onVote(vote);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote]);

  const onVote = rate => {
    voteYesNo(asset, rate);
  };

  const theme = useTheme();
  const styles = getStyles(theme);
  const charVoteYes = Platform.OS === 'ios' ? 'YES' : '👍';
  const charVoteNo = Platform.OS === 'ios' ? 'NO' : '👎';
  return (
    <View style={styles.pollContainer}>
      <Headline style={{ textAlign: 'center' }}>It was a useful activity for you?</Headline>
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
        <Text style={styles.title}>Thanks for voting</Text>
      </FadeEffect>
    </View>
  );
};

HeaderVote.propTypes = {
  asset: PropTypes.string,
};

export default HeaderVote;

const getStyles = theme =>
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
