import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 100,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  topCenter: {
    marginHorizontal: 'auto',
    // backgroundColor: '#f00a',
  },
  topLeft: {
    width: 100,
    margin: 15,
  },
  topRight: {
    minWidth: 100,
    margin: 5,
    alignItems: 'flex-end',
  },
  rowCenter: {
    margin: 'auto',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    // backgroundColor: '#f00a',
  },
  rowCenterAsRow: {
    flexDirection: 'row',
  },
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 100,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  bottomCenter: {
    marginHorizontal: 'auto',
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#00fa',
  },
  flexStartContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    overflow: 'visible',
    // backgroundColor: '#0f0a',
  },
  flexEndContent: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: '#f00a',
  },
  flexCenterContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: '#f00a',
  },
  backgroundStyle: {
    opacity: 0.7,
    position: 'absolute',
    zIndex: 1,
    bottom: 80,
    paddingBottom: 10,
    width: '100%',
    height: 280,
    backgroundColor: 'transparent',
  },
  debugRed: {
    backgroundColor: '#f00a',
  },
  debugGreen: {
    backgroundColor: '#0f0a',
  },
  debugBlue: {
    backgroundColor: '#00fa',
  },
});
