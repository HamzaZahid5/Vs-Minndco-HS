import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Headline, Paragraph, useTheme } from 'react-native-paper';
import GenericPageLayout from './../../components/GenericPageLayout';
import BigButton from '../../components/BigButton';
import ChipButton from '../../components/ChipButton';
import { Text } from 'react-native';

const KitFinish = ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  
  return (
    <GenericPageLayout
      onClose={() => navigateToHome(componentId)}
      fullScroll
      header={
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Headline style={styles.headline}>
              Congratulations!
            </Headline>
            <Paragraph style={styles.description}>
              VR videos now are part of the main program as well as 2d-videos, audios and writting activities.
            </Paragraph>
            <ChipButton onPress={() => navigation.navigate('Main')}>DONE</ChipButton>
          </View>
        </View>
      }
    >
      <View style={styles.contentWrapper}>
        <View style={{ width: '100%', marginTop: 40, alignItems: 'center' }}>
          <Text>To get ready for VR videos learn</Text>
          <BigButton
            style={{
              marginBottom: 20,
            }}
            onPress={() => navigation.navigate('Main')}
          >
            How to assemble my VR headset
          </BigButton>
        </View>
        <View style={{ width: '100%', marginTop: 40, alignItems: 'center' }}>
          <Text>If you feel ready, you can try it out now</Text>
          <BigButton
            style={{
              marginBottom: 20,
            }}
            onPress={() => navigation.navigate('Main')}
          >
            access my first VR activity!
          </BigButton>
        </View>
      </View>
    </GenericPageLayout>
  );
};

export default KitFinish;

const getStyles = theme => StyleSheet.create({
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
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
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
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 5,
  },
});
