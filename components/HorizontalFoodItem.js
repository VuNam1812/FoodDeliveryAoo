import React from 'react'
import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FONTS, icons, SIZES } from '../constants'

const HorizontalFoodItem = ({ style, imageStyle, food, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[{ width: SIZES.width - SIZES.padding * 2, borderRadius: SIZES.padding, flexDirection: 'row', alignItems: 'center' }, style]} >
      <Image source={food.image} style={[{ marginTop: 25 }, imageStyle]} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', ...FONTS.h3 }}>{food.name}</Text>
        <Text numberOfLines={2} ellipsizeMode='tail' style={{ marginBottom: SIZES.base, width: '100%', paddingRight: SIZES.padding, ...FONTS.h4 }}>{food.description}</Text>
        <Text style={{ fontWeight: 'bold', ...FONTS.h2 }}>{food.price} $</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 0, right: SIZES.padding }}>
        <Image source={icons.calories} style={{ marginTop: 5, width: 30, height: 30 }} />
        <Text>{food.calories} calories</Text>
      </View>
    </TouchableOpacity >
  )
}

export default HorizontalFoodItem
