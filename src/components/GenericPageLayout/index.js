/**
 * NEW DESIGN FOR PAGES WITH CONFIGURATION VARIANTS.
 * USED IN HOME, LEVEL OVERVIEW, ACTIVITY, ACTIVITY POLL & STATISTICS.
 */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  ScrollView,
  // StatusBar,
  // Platform,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isFunction } from '../../utils/helpers';
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

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps={'handled'}
      extraHeight={390}
      contentContainerStyle={{
        flexGrow: 1,
        margin: 'auto',
      }}
      style={[styles.mainContainer, { backgroundColor: 'transparent' }]}
    >
      <View style={styles.headerContainer}>
        <View style={styles.headerWrapper}>{header}</View>
      </View>
      {contentWraper}
    </KeyboardAwareScrollView>
  );
};

GenericPageLayout.propTypes = {
  header: PropTypes.oneOf(PropTypes.object, PropTypes.bool),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  noScrollContent: PropTypes.bool,
  fullScroll: PropTypes.bool,
  thinContent: PropTypes.bool,
  withKeyboard: PropTypes.bool,
};

export default GenericPageLayout;

const styles = StyleSheet.create({
  mainContainer: {
    // borderWidth: 1,
    borderColor: 'purple',
  },
  staticMainContainer: {},
  headerContainer: {
    height: 232,
  },
  headerWrapper: {},
  commonContentContainer: {
    paddingHorizontal: 20,
    flexGrow: 1,
    margin: 'auto',
    // borderWidth: 1,
    borderColor: 'lime',
  },
  thinContentContainer: {
    paddingHorizontal: 0,
  },
  scrollContentContainer: {},
  staticContentContainer: {},
});
