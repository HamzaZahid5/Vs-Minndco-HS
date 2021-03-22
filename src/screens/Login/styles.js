import { StyleSheet, StyleProp } from 'react-native';

export default StyleSheet.create({
  surface: {
    // borderWidth: 1, borderColor: 'red',
    padding: 30,
    minHeight: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    elevation: 0,
    // minHeight: 'auto',
  },
  absolutScrollView: {
    // borderWidth: 1, borderColor: 'red',
    width: '100%',
    minHeight: '100%',
  },
  title: {
    fontSize: 40,
    lineHeight: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: 'white',
  },
});
