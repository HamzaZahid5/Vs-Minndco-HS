import React, { useEffect, useRef } from 'react'
import { View, Text } from 'react-native'
import { styles } from './styles'

export const Slide = (props: any) => {
  const slideRef = useRef();
  const { title, size, children } = props;

  useEffect(() => {
    if (slideRef?.current?.parentNode) {
      slideRef.current.parentNode.style.width = size;
    }
  }, [size])

  return (
    <View style={styles.slide} ref={slideRef}>
      {title && (
        <Text style={styles.slideText}>
          {title}
        </Text>
      )}
      {children}
    </View>
  );
}

export default Slide;