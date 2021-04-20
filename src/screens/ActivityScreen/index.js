import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  useTheme,
  IconButton,
  Title,
  Paragraph,
  Divider,
  Headline,
} from 'react-native-paper';
import BigButton from '../../components/BigButton';
import GenericPageLayout from '../../components/GenericPageLayout';
import VidePlayer from '../../components/VidePlayer';
import ScreenDecorator from '../../components/ScreenDecorator';
import { getTipsByActivityType, getIconByActivityType } from '../../utils/helpers'

export default () => {
  const theme = useTheme();
  const [action, setAction] = useState('INIT');
  const activity = {
    type: 'vr-met',
    duration: 10,
    description: '',
  }
  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        header={
          <View style={styles.hero}>
            <View style={styles.heroContent}>
              <View style={{ width: '60%', alignItems: 'center' }}>
                { action === 'INIT' && (
                  <>
                    <Headline style={[styles.headline, { ...theme.fonts.headline }]}>
                      activity.name
                    </Headline>
                    <View style={{ marginTop: 20, height: 40 }}>
                      <BigButton variant="accent" onPress={() => setAction('PLAY_VIDEO')}>
                        Play
                      </BigButton>
                    </View>
                  </>
                )}
                { action === 'PLAY_VIDEO' && (
                  <VidePlayer />
                )}
              </View>
            </View>
          </View>
        }
      >
        <View style={{
          borderWidth: 1,
          borderColor: 'red',
          // flexGrow: 1,
        }}>
          <View style={[styles.content]}>
            <IconButton
              icon={getIconByActivityType(activity.type)}
              size={30}
              color="white"
              style={[styles.activityIcon, { backgroundColor: theme.colors.background } ]}
            />
            <Title style={[styles.title, { ...theme.fonts.small, color: theme.colors.text }]}>
              {activity.duration}{' min.'}
            </Title>
            <Paragraph style={[styles.description, , { ...theme.fonts.small, color: theme.colors.backdrop }]}>{activity.description}</Paragraph>
          </View>
          <Divider
            style={{
              marginTop: 24,
              backgroundColor: theme.colors.backdrop,
            }}
          />
          <View style={styles.content}>
            <Title style={styles.title}>
              Some tips before start
            </Title>
            <Paragraph style={styles.description}>
              {getTipsByActivityType(activity.type)}
            </Paragraph>
          </View>
        </View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
};

const styles = StyleSheet.create({
  // HEADER
  hero: {
    height: '100%',
    justifyContent: 'center',
  },
  // floatingImageContent: {
  //   height: '100%',
  // },
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
    // ...theme.customs.fonts.headline3,
    fontWeight: 'bold',
    color: 'white',
  },
  // completedHeadline: {
  //   marginTop: 50,
  // },
  // progressContainer: {
  //   position: 'absolute',
  //   bottom: 50,
  // },
  // progress: {
  //   height: 5,
  //   width: 100,
  //   borderRadius: 5,
  // },
  // legendContainer: {
  //   position: 'absolute',
  //   bottom: 20,
  // },
  // legend: {
  //   ...theme.customs.fonts.extraSmall,
  //   color: 'white',
  //   textAlign: 'center',
  // },
  // completedLegend: {
  //   ...theme.customs.fonts.small,
  //   fontWeight: 'bold',
  //   marginBottom: 21,
  // },
  // CONTENT
  content: {
    marginHorizontal: 4,
  },
  activityIcon: {
    margin: 0,
    marginBottom: 24,
    padding: 0,
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  description: {
  },
});
