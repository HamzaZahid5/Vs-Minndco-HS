/* eslint-disable no-console */
/**
 * FADES IN OR OUT ITS CHILDREN.
 * USED INTO LIFESAVER CHAT BOT, BASIC TUTORIAL AND LOGIN.
 */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, LayoutAnimation } from 'react-native';

const FadeEffect = ({ show, children, duration = 400, style }) => {
  const [animation] = useState(new Animated.Value(0));
  const [appear, setAppear] = useState(false);
  useEffect(() => {
    if (show) {
      fadeIn();
    } else {
      fadeOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  const fadeIn = () => {
    if (animation._value === 1) return;
    setAppear(true);
    Animated.timing(animation, {
      toValue: 1,
      timing: duration,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    if (animation._value === 0) return;
    Animated.timing(animation, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start(() => {
      if (animation._value === 0) setAppear(false);
    });
  };
  const animatedStyle = [
    {
      opacity: animation,
      display: !appear ? 'none' : 'flex',
    },
  ];
  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
};

FadeEffect.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  duration: PropTypes.number,
  style: PropTypes.object,
};

export default FadeEffect;
