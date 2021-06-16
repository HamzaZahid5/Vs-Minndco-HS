import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Headline, Paragraph, useTheme } from 'react-native-paper';
import ScreenDecorator from '../../components/ScreenDecorator';
import GenericPageLayout from '../../components/GenericPageLayout';
import RowItem from '../../components/RowItem';

const KitFinish = ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <ScreenDecorator>
      <GenericPageLayout
        onClose={() => navigation.back()}
        fullScroll
        header={
          <View style={styles.hero}>
            <View style={styles.heroContent}>
              <Headline style={styles.headline}>
                VR-MET<Text style={{ fontSize: 13, lineHeight: 25, textAlignVertical: 'top' }}>®</Text>
              </Headline>
              <Paragraph style={styles.description}>
                Is a program that combines Virtual Reality, Mindfulness based self-control and cue-exposure therapy for
                a high efficiency in behaviour change.
              </Paragraph>
              {/* <ChipButton onPress={() => navigation.navigate('Main')}>DONE</ChipButton> */}
            </View>
          </View>
        }
      >
        <View style={styles.contentWrapper}>
          <Text>Pave the way for VR-MET</Text>
          <View style={{ width: '100%', marginTop: 40, alignItems: 'center' }}>
            <RowItem
              title="Set up my VR headset"
              text="You need your gear ready to go"
              reverse
              onPress={() => navigation.push('KitAssemble')}
            />
          </View>
          <View style={{ width: '100%', marginTop: 40, alignItems: 'center' }}>
            <RowItem
              title="Take me to the VR screen"
              text="Ready to try VR?"
              reverse
              onPress={() => navigation.push('VRDemo')}
            />
          </View>
        </View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

KitFinish.propTypes = {
  navigation: PropTypes.object,
};

export default KitFinish;

const getStyles = theme =>
  StyleSheet.create({
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
      paddingHorizontal: 20,
    },
    headline: {
      ...theme.fontsHelper.heading1,
      color: 'white',
    },
    contentWrapper: {
      marginVertical: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      // alignItems: 'flex-start',
    },
    itemOption: {
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: theme.colors.accent,
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
      color: theme.colors.text,
      marginTop: 5,
    },
  });
