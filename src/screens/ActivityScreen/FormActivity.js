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
import ReflectionActivityForm from '../../components/ReflectionActivityForm';
import BigButton from '../../components/BigButton';
import { getTipsByActivityType, getIconByActivityType } from '../../utils/helpers';

const activity = {
  type: 'vr-met',
  duration: 10,
  description: '',
}

export const header = () => {
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
        <ReflectionActivityForm />
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