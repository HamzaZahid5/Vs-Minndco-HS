import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import useValuationActions from '../../appActionHooks/useValuationActions';

const HeaderRating = ({ asset = '' }) => {
  const [vote, setVote] = useState(0);
  const { voteRating } = useValuationActions();

  useEffect(() => {
    if (vote > 0) {
      onVote(vote);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote]);

  const onVote = rate => {
    voteRating(asset, rate);
  };

  const theme = useTheme();
  const styles = getStyles(theme);
  const starChar = Platform.OS === 'ios' ? '★' : '⭐️';
  return (
    <View style={styles.pollContainer}>
      <Text>{"how useful you've found the activity?"}</Text>
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
    </View>
  );
};

HeaderRating.propTypes = {
  asset: PropTypes.string,
};

export default HeaderRating;

const getStyles = theme =>
  StyleSheet.create({
    pollContainer: {
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
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
  });
