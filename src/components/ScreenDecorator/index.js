import React from 'react';
import PropTypes from 'prop-types';
import HeaderPadding from '../../utils/HeaderPadding';
import BubblesBackground from '../../components/BubblesBackground';

const ScreenDecorator = ({ children }) => (
  <>
    <BubblesBackground />
    <HeaderPadding />
    {children}
  </>
);

ScreenDecorator.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

export default ScreenDecorator;
