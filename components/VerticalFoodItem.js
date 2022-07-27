import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../constants'

const VerticalFoodItem = ({ style, imageStyle, food, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[{}, style]} >
      <View style={{ flexDirection: 'row', flex: 1, width: '100%', paddingHorizontal: SIZES.base, justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icons.calories} style={{ marginTop: 5, width: 30, height: 30 }} />
          <Text>{food.calories} calories</Text>
        </View>
        <TouchableOpacity >
          <Image source={icons.love} style={{ width: 20, height: 20, tintColor: food.isFavourite ? COLORS.primary : COLORS.gray }} />
        </TouchableOpacity>
      </View>
      <Image source={food.image} style={[{ marginTop: 25 }, imageStyle]} />
      <View style={{ flex: 1, alignItems: 'center', marginTop: -25, marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold', ...FONTS.h3 }}>{food.name}</Text>
        <Text numberOfLines={2} ellipsizeMode='tail' style={{ marginBottom: SIZES.base, width: '100%', textAlign: 'center', ...FONTS.h4 }}>{food.description}</Text>
        <Text style={{ fontWeight: 'bold', ...FONTS.h2 }}>{food.price} $</Text>
      </View>

    </TouchableOpacity >
  )
}

export default VerticalFoodItem
