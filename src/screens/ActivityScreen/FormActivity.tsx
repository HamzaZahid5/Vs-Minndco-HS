import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Headline, IconButton, Title, Paragraph, Divider, useTheme } from 'react-native-paper';
// @ts-ignore: non-ts file
import ReflectionActivityForm from '../../components/ReflectionActivityForm';
import BigButton from '../../components/BigButton';
// @ts-ignore: non-ts file
import { getTipsByActivityType, getIconByActivityType } from '../../utils/helpers';
import { activityType } from '../../../types';
import { CustomThemeType } from '../../utils/OriginalTheme';
import { translate } from '../../utils/localization';

export const Header = ({ title }: { title: string }) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getHeaderStyles(theme);
  const [action, setAction] = useState('INIT');

  return (
    <>
      {action === 'INIT' && (
        <>
          <Headline style={styles.headline}>{title}</Headline>
          <Paragraph style={styles.paragraph}>{translate('screens.Activity.form-header-paragraph')}</Paragraph>
        </>
      )}
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

const getHeaderStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    headline: {
      ...theme.fonts.headline,
      color: 'white',
      textAlign: 'center',
    },
    paragraph: {
      textAlign: 'center',
    },
  });

export const Body = ({
  type,
  duration,
  description,
  asset,
  onComplete,
}: activityType & {
  onComplete: (anwser?: string) => void;
}) => {
  const theme = useTheme() as CustomThemeType;
  const styles = getBodyStyles(theme);

  return (
    <>
      <View style={[styles.content]}>
        <IconButton
          icon={getIconByActivityType(type)}
          size={30}
          color={theme.colors.primary}
          style={[styles.activityIcon, { backgroundColor: '#FFFBC6', borderWidth: 3, borderColor: '#F0E983' }]}
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
        <ReflectionActivityForm question={asset} onEnd={onComplete} />
      </View>
    </>
  );
};

Body.propTypes = {
  type: PropTypes.string,
  duration: PropTypes.string,
  description: PropTypes.string,
  asset: PropTypes.string,
  onComplete: PropTypes.func,
};

const getBodyStyles = (theme: CustomThemeType) =>
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
