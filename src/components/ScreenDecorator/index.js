import React from 'react';
import HeaderPadding from '../../utils/HeaderPadding';
import BubblesBackground from '../../components/BubblesBackground';
import { View } from 'react-native';

export default ({ children }) => (
  <>
    <BubblesBackground />
    <HeaderPadding />
    {children}
  </>
);
