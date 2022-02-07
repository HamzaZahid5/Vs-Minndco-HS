import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: '100%',
    flex: 1,
    flexGrow: 1,
    maxWidth: '100%',
    minWidth: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    // height: '100%',
    // maxHeight: '100%',
    borderWidth: 0,
    borderColor: 'red',
  },
  slideText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default styles;
