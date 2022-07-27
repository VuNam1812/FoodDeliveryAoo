import React from 'react';
import {
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { IconButton, TwoPointSlider } from '../../components';
import { COLORS, constants, FONTS, icons, SIZES } from '../../constants';

const Section = ({ label, children }) => {
  return (
    <View
      style={{
        marginBottom: SIZES.padding,
        width: SIZES.width,
        paddingHorizontal: SIZES.padding,
      }}>
      <Text style={{ ...FONTS.h3, fontSize: 18, fontWeight: 'bold' }}>
        {label}
      </Text>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
};

const FilterSearch = ({ show, onClose }) => {
  const bottom = useSharedValue(-(SIZES.height * 0.8));

  const bottomStyle = useAnimatedStyle(() => {
    return {
      bottom: bottom.value,
    };
  });

  //#region distance
  const renderDistance = () => {
    return (
      <Section label="Distance">
        <View style={{ alignItems: 'center', flex: 1 }}>
          <TwoPointSlider
            values={[3, 10]}
            min={1}
            max={30}
            postfix="km"
            onValuesChange={values => console.log(values)}
          />
        </View>
      </Section>
    );
  };
  //#endregion

  //#region delivery time
  const renderDeliveryTime = () => {
    return (
      <Section label="Delivery Time">
        <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
          {constants.delivery_time.map((item, idx) => {
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}

                style={[
                  {
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor:
                      idx === 0 ? COLORS.primary : COLORS.lightGray2,
                    marginRight: SIZES.radius,
                    borderRadius: 6,
                    padding: SIZES.padding / 2,
                  },
                ]}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    ...FONTS.body3,
                    color: idx === 0 ? COLORS.white : COLORS.gray,
                  }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Section>
    );
  };
  //#endregion

  //#region pricing range
  const renderPricingRange = () => {
    return (
      <Section label="Pricing Range">
        <View style={{ alignItems: 'center', flex: 1 }}>
          <TwoPointSlider
            values={[30, 100]}
            min={10}
            max={200}
            postfix="$"
            onValuesChange={values => console.log(values)}
          />
        </View>
      </Section>
    );
  };
  //#endregion

  //#region rating
  const renderRating = () => {
    return (
      <Section label="Rating">
        <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
          {constants.ratings.map((item, idx) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}

                key={item.id}
                style={[
                  {
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      idx === 0 ? COLORS.primary : COLORS.lightGray2,
                    marginRight: SIZES.radius,
                    borderRadius: 6,
                    padding: SIZES.padding / 2,
                  },
                ]}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    ...FONTS.body3,
                    color: idx === 0 ? COLORS.white : COLORS.gray,
                  }}>
                  {item.label}
                </Text>
                <Image
                  source={icons.star}
                  style={[
                    {
                      width: 15,
                      height: 15,
                      marginLeft: SIZES.base,
                      tintColor: idx === 0 ? COLORS.white : COLORS.gray,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </Section>
    );
  };
  //#endregion

  //#region tags
  const renderTags = () => {
    return (
      <Section label="Tags">
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            marginTop: SIZES.radius,
          }}>
          {constants.tags.map((item, idx) => {
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}

                style={[
                  {
                    marginBottom: SIZES.base,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      idx === 0 ? COLORS.primary : COLORS.lightGray2,
                    marginRight: SIZES.radius,
                    borderRadius: 6,
                    padding: SIZES.padding / 2,
                  },
                ]}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    ...FONTS.body3,
                    color: idx === 0 ? COLORS.white : COLORS.gray,
                  }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Section>
    );
  };
  //#endregion

  React.useEffect(() => {
    bottom.value = withTiming(show ? 0 : -(SIZES.height * 0.8), {
      duration: 300,
    });
  }, [show]);
  return (
    <Modal
      visible={show}
      transparent={true}
      animationType="fade"
      style={{ backgroundColor: 'blue' }}>
      <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}></View>
        </TouchableWithoutFeedback>
      </View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: -(SIZES.height * 0.8),
            height: SIZES.height * 0.8,
            backgroundColor: 'white',
            borderTopLeftRadius: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            width: SIZES.width,
          },
          bottomStyle,
        ]}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            width: SIZES.width,
            justifyContent: 'space-between',
            padding: SIZES.padding,
          }}>
          <Text style={{ ...FONTS.h3, fontSize: 18, fontWeight: 'bold' }}>
            Filter Your Search
          </Text>
          <IconButton
            icon={icons.cross}
            containerStyle={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: COLORS.gray2,
            }}
            onPress={onClose}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderDistance()}
          {renderDeliveryTime()}
          {renderPricingRange()}
          {renderRating()}
          {renderTags()}
        </ScrollView>
        <View style={{ backgroundColor: "white", marginVertical: SIZES.base * 2 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginHorizontal: SIZES.padding,
              padding: SIZES.padding / 2,
              backgroundColor: COLORS.primary,
              borderRadius: 8,
              alignItems: 'center',
            }}>
            <Text
              style={{ color: COLORS.white, fontWeight: 'bold', ...FONTS.h3 }}>
              Apply Filter
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default FilterSearch;
