/**
 * NEW DESIGN FOR PAGES WITH CONFIGURATION VARIANTS.
 * USED IN HOME, LEVEL OVERVIEW, ACTIVITY, ACTIVITY POLL & STATISTICS.
 */
import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  // StatusBar,
  // Platform,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'expo-linear-gradient';
import { Text } from 'react-native';
import { isFunction } from '../../utils/helpers';
import BubblesBackground from '../../components/BubblesBackground'
/**
 ==== NAV ======
 ===============
 =   HEADER    =
 =             =
 ===============
 =             =
 =             =
 =   CONTENT   =
 =             =
 =             =
 =             =
 ===============
 */
const GenericPageLayout = ({
  header = false, // HEADER elements
  children = _ => _, // CONTENT elements
  noScrollContent = false, // do not scroll content
  // topBarTitle = '', // NAV title
  // topBarLeft = null, // NAV left element
  // callback on press back button which is auto included as NAV top left element
  // onBack = null,
  // callback on press close button which is auto included as NAV top right element
  // onClose = null,
  // topBarRight = null, // NAV right element
  // hideTopBar = false, // no NAV present
  fullScroll = false, // HEADER & CONTENT wrapped with ScrollView
  thinContent = false, // remove lateral paddings on CONTENT
  withKeyboard = false, // include wrapper on CONTENT for Keyboard Aware Scroll View
}) => {
  const contentRef = useRef(null);
  const theme = useTheme();
  const scrollContentTo = (offset = 0) => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ y: offset, animated: true });
    }
  };
  
  const contentWraper =
    noScrollContent || fullScroll ? (
      <View
        style={[
          styles.staticContentContainer,
          styles.commonContentContainer,
          thinContent ? styles.thinContentContainer : null,
        ]}
      >
        {children}
      </View>
    ) : (
      <ScrollView
        style={[
          styles.scrollContentContainer,
          styles.commonContentContainer,
          thinContent ? styles.thinContentContainer : null,
        ]}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps={'handled'}
        ref={contentRef}
      >
        {isFunction(children) ? children({ scrollContentTo }) : children}
      </ScrollView>
    );
  // const LeftActions =
  //   topBarLeft || (onBack && <Appbar.BackAction onPress={onBack} />);
  // const RightActions =
  //   topBarRight ||
  //   (onClose && <Appbar.Action icon="close" onPress={onClose} />);

  const ScreenWrapper = ({ noWrap = false, children }) => (
    noWrap
      ? children
      : (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
          {children}
        </KeyboardAwareScrollView>
      )
  )
  const withScreenWrapper =
    fullScroll || withKeyboard
      ? children => (
          <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
            {children}
          </KeyboardAwareScrollView>
        )
      : _ => _;
  return (
    <>
      {/* {!hideTopBar && (
        <Appbar.Header
          style={{
            elevation: 0,
            backgroundColor: theme.customs.colors.White,
          }}
        >
          {LeftActions}
          <Appbar.Content
            title={topBarTitle}
            titleStyle={{
              textAlign: 'center',
              marginRight:
                RightActions === null && Platform.OS === 'android' ? 55 : 0,
            }}
          />
          {RightActions}
        </Appbar.Header>
      )} */}
      <ScreenWrapper noWrapp={!fullScroll && !withKeyboard}>
        <>
          <View
            style={[
              styles.mainContainer,
              { backgroundColor: 'transparent' },
              noScrollContent || fullScroll ? styles.staticMainContainer : null,
            ]}
          >
            {/* <LinearGradient
              colors={['#ecf1f2ff', '#ecf1f200']}
              style={[styles.headerContainer, { backgroundColor: theme.colors.background }]}
            >
              {header && <View style={styles.headerWrapper}>{header}</View>}
            </LinearGradient> */}
            <View style={styles.headerContainer}>
              <View style={styles.headerWrapper}>{header}</View>
            </View>
            {contentWraper}
          </View>
          {/* { withBG && <BubblesBackground />} */}
        </>
      </ScreenWrapper>
      {/* {withScreenWrapper(
        <>
          <View
            style={[
              styles.mainContainer,
              { backgroundColor: 'transparent' },
              noScrollContent || fullScroll ? styles.staticMainContainer : null,
            ]}
          >
            <LinearGradient
              colors={['#ecf1f2ff', '#ecf1f200']}
              style={[styles.headerContainer, { backgroundColor: theme.colors.background }]}
            >
              {header && <View style={styles.headerWrapper}>{header}</View>}
            </LinearGradient>}
            <View style={styles.headerContainer}>
              <View style={styles.headerWrapper}>{header}</View>
            </View>
            {contentWraper}
          </View>
          <BubblesBackground />
        </>
      )} */}
    </>
  );
};

export default GenericPageLayout;

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: theme.customs.colors.White,
    minHeight: '100vh',
    flex: 1,
    paddingBottom: 50,
    // borderWidth: 10,
    height: '100%',
    borderColor: 'orange',
  },
  staticMainContainer: {
    minHeight: '100%',
  },
  headerContainer: {
    // backgroundColor: theme.customs.colors.White,
  },
  headerWrapper: {
    height: 232,
  },
  commonContentContainer: {
    paddingHorizontal: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: 'lime',
  },
  thinContentContainer: {
    paddingHorizontal: 0,
  },
  scrollContentContainer: {},
  staticContentContainer: {},
});
