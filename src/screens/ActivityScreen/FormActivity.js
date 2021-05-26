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

export const header = ({ title }) => {
  const theme = useTheme();
  const styles = getHeaderStyles(theme);
  const [action, setAction] = useState('INIT');

  return (
    <>
    { action === 'INIT' && (
      <>
        <Headline style={styles.headline}>
          {title}
        </Headline>
        <Paragraph>Read, think about and answer</Paragraph>
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

export const body = ({ type, duration, description, asset, onComplete }) => {
  const theme = useTheme();
  const styles = getBodyStyles(theme);

  return (
    <>
      <View style={[styles.content]}>
        <IconButton
          icon={getIconByActivityType(type)}
          size={30}
          color={theme.colors.primary}
          style={[styles.activityIcon, { backgroundColor: '#FFFBC6', borderWidth: 3, borderColor: '#F0E983' } ]}
        />
        <Title style={[styles.title, { ...theme.fonts.small, color: theme.colors.text }]}>
          {duration}{' min.'}
        </Title>
        <Paragraph style={[styles.description, , { ...theme.fonts.small, color: theme.colors.backdrop }]}>{description}</Paragraph>
      </View>
      <Divider
        style={{
          marginTop: 24,
          backgroundColor: theme.colors.backdrop,
        }}
      />
      <View style={styles.content}>
        <ReflectionActivityForm question={asset} onEnd={onComplete}/>
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