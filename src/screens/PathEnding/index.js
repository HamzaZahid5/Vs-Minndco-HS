import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import GenericPageLayout from '../../components/GenericPageLayout';
import ScreenDecorator from '../../components/ScreenDecorator';
import RowItem from '../../components/RowItem';

export default () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <ScreenDecorator>
      <GenericPageLayout
        fullScroll
        header={
          <View style={styles.hero}>
            <Text>Some feedback here!</Text>
          </View>
        }
      >
          <Text style={styles.bodyTitle}>What's next?</Text>
        <View style={styles.bodyContainer}>
          <RowItem title="Use the lifesaver again" text="Still feeling stressed?" reverse />
          <RowItem title="Use the lifesaver again" text="Still feeling stressed?" reverse />
          <RowItem title="Use the lifesaver again" text="Still feeling stressed?" reverse />
        </View>
      </GenericPageLayout>
    </ScreenDecorator>
  );
}

const getStyles = theme => StyleSheet.create({
  hero: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    // backgroundColor: '#f00a',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bodyTitle: {
    ...theme.fonts.heading2,
    color: theme.colors.dark,
  },
});
