// Loader.js
import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="primary" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

export default Loader
