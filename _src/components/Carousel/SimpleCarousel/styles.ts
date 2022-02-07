import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  statsHead: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  container: {
    width: '100%',
    flex: 1,
    // minHeight: '100%',
    backgroundColor: '#fbfbfb',
    borderColor: 'purple',
    borderWidth: 0,
    borderRadius: 8,
    shadowColor: '#fcfcfc',
    shadowOpacity: 1,
    // marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    display: 'flex',
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bullets: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 40,
    color: 'red',
  },
});

export default styles;
