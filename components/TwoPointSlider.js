import MultiSlider from '@ptomasroos/react-native-multi-slider'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'

const TwoPointSlider = ({ values, prefix, postfix, min, max, }) => {
  return (
    <MultiSlider
      values={values}
      min={min}
      max={max}
      sliderLength={SIZES.width - (SIZES.padding * 2)}
      step={1}
      selectedStyle={{
        backgroundColor: COLORS.primary,
      }}
      trackStyle={{
        height: 10,
        borderRadius: 10,
        backgroundColor: COLORS.lightGray2,
      }}
      minMarkerOverlapDistance={50}
      markerOffsetY={15}
      customMarker={(e) => {
        return <View style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            height: 25,
            width: 25,
            borderRadius: 15,
            borderWidth: 4,
            borderColor: COLORS.white,
            backgroundColor: COLORS.primary,
            ...styles.shadow
          }}>
          </View>
          <Text style={{ ...FONTS.body3, color: COLORS.darkGray, marginTop: 0 }}>
            {prefix}{e.currentValue} {postfix}
          </Text>
        </View>
      }
      }
    />
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#0000000',
    shadowOffset: {
      x: 0,
      y: 0
    },
    shadowRadius: 1,
    elevation: 1,
    shadowOpacity: 0.1,
  }
})

export default TwoPointSlider
