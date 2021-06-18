import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Headline, IconButton, Title, Paragraph, Divider, useTheme } from 'react-native-paper';
import VRPlayer from '../../components/VRPlayer';
import BigButton from '../../components/BigButton';
import { getTipsByActivityType, getIconByActivityType } from '../../utils/helpers';

const activity = {
  type: 'vr-met',
  duration: 10,
  description: '',
};

export const Header = ({ onPlay, title, duration, description }) => {
  const theme = useTheme();
  const styles = getHeaderStyles(theme);
  const [action, setAction] = useState('INIT');

  return (
    <>
      {action === 'INIT' && (
        <>
          <Headline style={styles.headline}>{title}</Headline>
          <View style={{ marginTop: 20, height: 40 }}>
            <BigButton variant="accent" onPress={onPlay}>
              Start
            </BigButton>
          </View>
        </>
      )}
    </>
  );
};

Header.propTypes = {
  onPlay: PropTypes.func,
  duration: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

const getHeaderStyles = theme =>
  StyleSheet.create({
    headline: {
      ...theme.fonts.headline,
      color: 'white',
      textAlign: 'center',
    },
  });

export const Body = ({ type, duration, description }) => {
  const theme = useTheme();
  const styles = getBodyStyles(theme);
  return (
    <>
      <View style={[styles.content]}>
        <IconButton
          icon={getIconByActivityType(type)}
          size={30}
          color="white"
          style={[styles.activityIcon, { backgroundColor: theme.colors.accent }]}
        />
        <Title style={[styles.title, { ...theme.fonts.small, color: theme.colors.text }]}>
          {duration}
          {' min.'}
        </Title>
        <Paragraph style={[styles.description, , { ...theme.fonts.small, color: theme.colors.backdrop }]}>
          {description}
        </Paragraph>
      </View>
      <Divider
        style={{
          marginTop: 24,
          backgroundColor: theme.colors.backdrop,
        }}
      />
      <View style={styles.content}>
        <Title style={styles.title}>Some tips before start</Title>
        <Paragraph style={styles.description}>{getTipsByActivityType(type)}</Paragraph>
      </View>
    </>
  );
};

Body.propTypes = {
  type: PropTypes.string,
  duration: PropTypes.string,
  description: PropTypes.string,
};

const getBodyStyles = theme =>
  StyleSheet.create({
    content: {
      marginHorizontal: 4,
    },
    activityIcon: {
      margin: 0,
      marginBottom: 24,
      padding: 0,
    },
    title: {
      // fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    description: {},
  });
