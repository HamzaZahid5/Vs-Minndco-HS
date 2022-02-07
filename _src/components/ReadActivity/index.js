import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';
import Carousel from '../Carousel';

const ReadActivity = ({ content }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <Carousel
      items={content.pages
        .filter(el => el !== '')
        .map((page, idx) => ({
          // title: content.title,
          content: (
            <>
              <Text style={styles.title}>{content.title}</Text>
              <View style={styles.container}>
                <Text style={styles.number}>0{idx + 1}</Text>
                <Paragraph style={styles.text}>{page}</Paragraph>
              </View>
            </>
          ),
        }))}
      testID="read-activity-carousel"
    />
  );
};

ReadActivity.propTypes = {
  content: PropTypes.string,
};

export default ReadActivity;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      justifyContent: 'center',
      shadowColor: '#664AB9',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 4,
      margin: 10,
    },
    title: {
      ...theme.fontsHelper.heading2,
      marginBottom: 10,
    },
    text: {
      ...theme.fonts.thin,
      fontSize: 20,
      lineHeight: 30,
    },
    number: {
      position: 'absolute',
      top: -15,
      right: 0,
      margin: 20,
      fontSize: 40,
      color: '#0005',
      // fontWeight: 'bold',
    },
  });
