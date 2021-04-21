import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Headline,
  IconButton,
  Title,
  Paragraph,
  Divider,
  useTheme,
} from 'react-native-paper';
import VRPlayer from '../../components/VRPlayer';
import BigButton from '../../components/BigButton';
import { getTipsByActivityType, getIconByActivityType } from '../../utils/helpers';

const activity = {
  type: 'vr-met',
  duration: 10,
  description: '',
}

export const header = ({ onPlay }) => {
  const theme = useTheme();
  const styles = getHeaderStyles(theme);
  const [action, setAction] = useState('INIT');

  return (
    <>
    { action === 'INIT' && (
      <>
        <Headline style={styles.headline}>
          activity.name
        </Headline>
        <View style={{ marginTop: 20, height: 40 }}>
          <BigButton variant="accent" onPress={onPlay}>
            Play
          </BigButton>
        </View>
      </>
    )}
  </>);
};

const getHeaderStyles = theme => StyleSheet.create({
  headline: {
    ...theme.fonts.headline,
    fontWeight: 'bold',
    color: 'white',
  },
});

export const body = () => {
  const theme = useTheme();
  const styles = getBodyStyles(theme);
  return (
    <>
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
    </>
  )
};

const getBodyStyles = theme => StyleSheet.create({
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