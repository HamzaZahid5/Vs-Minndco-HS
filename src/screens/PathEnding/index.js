import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Button } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import GenericPageLayout from '../../components/GenericPageLayout';
import ScreenDecorator from '../../components/ScreenDecorator';
import RowItem from '../../components/RowItem';
import HearderPoll from './HeaderPoll';


export const usePathEndingBarButton = (navigation, { text = 'Done', routeParams = {} } = {}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.reset({
            index: 1,
            routes: [
              { name: 'Main' },
              {
                name: 'PathEnding',
                params: routeParams ,
              },
            ],
          })}
          mode="text"
        >
          {text}
        </Button>
      ),
    });
  }, [navigation]);
}

export default () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const DailyActivityRow = <RowItem title="Use the lifesaver again" text="Still feeling stressed?" reverse />;
  const StressManagementRow = <RowItem title="Use the lifesaver again" text="Still feeling stressed?" reverse />;
  const CoachRow = <RowItem title="Use the lifesaver again" text="Still feeling stressed?" reverse />;
  const TutorialRow = <RowItem title="Use the lifesaver again" text="Still feeling stressed?" reverse />;
  const VRDemoRow = <RowItem title="Use the lifesaver again" text="Still feeling stressed?" reverse />;

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
    minHeight: '100%',
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
