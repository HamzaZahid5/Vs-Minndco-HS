import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import useValuationActions from '../../appActionHooks/useValuationActions';
import { translate } from '../../utils/localization';

const HeaderPoll = ({ asset }: { asset: string }) => {
  const [vote, setVote] = useState<'stressed' | 'bored' | 'angry' | 'happy'>();
  const { voteMood } = useValuationActions();

  const onVote = (rate: 'stressed' | 'bored' | 'angry' | 'happy') => {
    voteMood(asset, rate);
  };

  useEffect(() => {
    if (vote) {
      onVote(vote);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote]);

  const styles = getStyles();
  return (
    <View style={styles.pollContainer} testID="path-endind-header-poll">
      <Text>{translate('screens.PathEnding.how-do-you-feel')}</Text>
      <View style={styles.options}>
        <Pressable
          style={{
            backgroundColor: vote === 'stressed' ? 'gray' : 'transparent',
          }}
          onPress={() => setVote('stressed')}
        >
          <Text style={{}}>😩</Text>
          <Text style={{}}>{translate('screens.PathEnding.stressed')}</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: vote === 'bored' ? 'gray' : 'transparent',
          }}
          onPress={() => setVote('bored')}
        >
          <Text style={{}}>😕</Text>
          <Text style={{}}>{translate('screens.PathEnding.bored')}</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: vote === 'angry' ? 'gray' : 'transparent',
          }}
          onPress={() => setVote('angry')}
        >
          <Text style={{}}>😡</Text>
          <Text style={{}}>{translate('screens.PathEnding.angry')}</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: vote === 'happy' ? 'gray' : 'transparent',
          }}
          onPress={() => setVote('happy')}
        >
          <Text style={{}}>😄</Text>
          <Text style={{}}>{translate('screens.PathEnding.happy')}</Text>
        </Pressable>
      </View>
    </View>
  );
};

HeaderPoll.propTypes = {
  asset: PropTypes.string,
};

export default HeaderPoll;

const getStyles = () =>
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
