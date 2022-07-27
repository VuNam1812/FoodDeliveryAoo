import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { COLORS } from '../constants'

const IconButton = ({ iconStyle, icon, containerStyle, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ ...containerStyle }}>
      <Image source={icon} style={[{ width: 30, height: 30, tintColor: COLORS.gray2 }, iconStyle]} />
    </TouchableOpacity>
  )
}

export default IconButton
