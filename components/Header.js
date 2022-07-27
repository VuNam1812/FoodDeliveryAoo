import React from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {constants, dummyData, FONTS, SIZES} from '../constants';

const Header = ({style, title, leftComponent, rightComponent}) => {
  return (
    <View
      style={{
        width: SIZES.width,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...style,
      }}>
      {leftComponent}
      <Text
        style={{
          fontWeight: 'bold',
          ...FONTS.h2,
        }}>
        {title}
      </Text>
      {rightComponent}
    </View>
  );
};

export default Header;
