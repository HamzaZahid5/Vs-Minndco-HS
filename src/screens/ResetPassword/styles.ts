import { StyleSheet, StyleProp } from 'react-native';

export default StyleSheet.create({
  surface: {
    flex: 1,
    elevation: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  absolutScrollView: {
    // borderWidth: 1, borderColor: 'red',
    width: '100%',
    minHeight: '100%',
  },
  title: {
    fontSize: 40,
    lineHeight: 40,
    // fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: 'white',
  },
});
