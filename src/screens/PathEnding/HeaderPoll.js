import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import useValuationActions from '../../appActionHooks/useValuationActions';

const HeaderPoll = ({ asset }) => {
  const [vote, setVote] = useState();
  const { voteMood } = useValuationActions();

  const onVote = rate => {
    voteMood(asset, rate);
  };

  useEffect(() => {
    if (vote) {
      onVote(vote);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote]);

  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.pollContainer}>
      <Text>Now tell me, how do you feel?</Text>
      <View style={styles.options}>
        <Pressable
          style={{
            backgroundColor: vote === 'stressed' ? 'gray' : 'transparent',
          }}
          onPress={() => setVote('stressed')}
        >
          <Text style={{}}>😩</Text>
          <Text style={{}}>Stressed</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: vote === 'bored' ? 'gray' : 'transparent',
          }}
          onPress={() => setVote('bored')}
        >
          <Text style={{}}>😕</Text>
          <Text style={{}}>Bored</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: vote === 'angry' ? 'gray' : 'transparent',
          }}
          onPress={() => setVote('angry')}
        >
          <Text style={{}}>😡</Text>
          <Text style={{}}>Angry</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: vote === 'happy' ? 'gray' : 'transparent',
          }}
          onPress={() => setVote('happy')}
        >
          <Text style={{}}>😄</Text>
          <Text style={{}}>Happy</Text>
        </Pressable>
      </View>
    </View>
  );
};

HeaderPoll.propTypes = {
  asset: PropTypes.string,
};

export default HeaderPoll;

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
  });
