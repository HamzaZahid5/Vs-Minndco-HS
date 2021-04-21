import React from 'react';
import { View, StyleSheet } from 'react-native';

import GenericPageLayout from '../../components/GenericPageLayout';

import ScreenDecorator from '../../components/ScreenDecorator';
import { header as VideoHeader, body as VideoBody } from './VideoActivity'
import { header as AudioHeader, body as AudioBody } from './AudioActivity'
import { header as VRHeader, body as VRBody } from './VRActivity'
import { header as FormHeader, body as FormBody } from './FormActivity'

export default ({ navigation }) => {
  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        // withKeyboard={true}
        header={
          <View style={styles.hero}>
            <FormHeader id={'some_id'} />
          </View>
        }
      >
        <FormBody />
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
