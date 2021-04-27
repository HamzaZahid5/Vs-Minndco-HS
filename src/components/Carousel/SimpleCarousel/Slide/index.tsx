import React, { useEffect, useRef } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { styles } from './styles'
import { useHeaderHeight } from '@react-navigation/stack';


export const Slide = (props: any) => {
  const slideRef = useRef();
  const { title, size, children } = props;

  useEffect(() => {
    if (slideRef?.current?.parentNode) {
      slideRef.current.parentNode.style.width = size;
    }
  }, [size])

  const headerHeight = useHeaderHeight();
  const slideHeight = Dimensions.get('window').height - Math.round(headerHeight);
  return (
    <View style={[
      styles.slide,
      { height: slideHeight }
      ]}
      ref={slideRef}
    >
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