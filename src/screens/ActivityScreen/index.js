import React from 'react';
import { View, StyleSheet } from 'react-native';

import GenericPageLayout from '../../components/GenericPageLayout';

import ScreenDecorator from '../../components/ScreenDecorator';
import { header as VideoHeader, body as VideoBody } from './VideoActivity'
import { header as AudioHeader, body as AudioBody } from './AudioActivity'

export default () => {
  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        header={
          <View style={styles.hero}>
            <AudioHeader id={'some_id'} />
          </View>
        }
      >
        <AudioBody />
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

const styles = StyleSheet.create({
  hero: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
