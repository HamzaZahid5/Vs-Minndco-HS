import React, { DOMElement, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, useWindowDimensions } from 'react-native';
import { styles } from './styles';
import { useHeaderHeight } from '@react-navigation/stack';

export const Slide = ({ title, size, children }) => {
  const slideRef = useRef();

  useEffect(() => {
    if (slideRef?.current?.parentNode) {
      slideRef.current.parentNode.style.width = size;
    }
  }, [size]);

  const headerHeight = useHeaderHeight();
  const windowDimensions = useWindowDimensions();
  const slideHeight = windowDimensions.height - Math.round(headerHeight);
  return (
    <View style={[styles.slide, { height: slideHeight }]} ref={slideRef}>
      {title && <Text style={styles.slideText}>{title}</Text>}
      {children}
    </View>
  );
};

Slide.propTypes = {
  title: PropTypes.string,
  size: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};
export default Slide;
