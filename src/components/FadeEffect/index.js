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
  const appearTimeIDRef = useRef(0);
  useEffect(() => {
    if (show) {
      LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.easeInEaseOut, duration: duration / 2 }, () => {
        fadeIn();
      });
      setAppear(true);
    } else {
      fadeOut();
      appearTimeIDRef.current = setTimeout(() => {
        setAppear(false);
      }, duration);
    }
    return () => clearTimeout(appearTimeIDRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  const fadeIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      timing: duration,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
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
