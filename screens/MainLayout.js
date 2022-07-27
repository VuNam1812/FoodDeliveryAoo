import React, {useRef} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {COLORS, FONTS, SIZES} from './../constants/theme';
import {useDrawerProgress} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import {setSelectedTab} from '../redux/tabSlice';
import Header from '../components/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {constants, dummyData, icons} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect} from 'react';
import Home from './Home/Home';
import Cart from './Cart/Cart';
import Search from './Search/Search';
import Favorite from './Favorite/Favorite';
import Notification from './Notification/Notification';

const TabButton = ({isFocused, label, icon, onPress}) => {
  const flex = useSharedValue(1);
  const color = useSharedValue(COLORS.white);

  const flexStyle = useAnimatedStyle(() => {
    return {
      flex: flex.value,
    };
  });
  const colorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: color.value,
    };
  });

  useEffect(() => {
    flex.value = withTiming(isFocused ? 4 : 1, {
      duration: 300,
    });
    color.value = withTiming(isFocused ? COLORS.primary : COLORS.white, {
      duration: 300,
    });
  }, [isFocused]);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          {flex: 1, alignItems: 'center', justifyContent: 'center'},
          flexStyle,
        ]}>
        <Animated.View
          style={[
            {
              height: 50,
              borderRadius: 25,
              paddingHorizontal: SIZES.base,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            },
            colorStyle,
          ]}>
          <Image
            style={[
              {width: 20, height: 20},
              {tintColor: isFocused ? COLORS.white : COLORS.gray},
            ]}
            source={icon}
          />
          {isFocused && (
            <Text
              numberOfLines={1}
              style={{
                fontWeight: 'bold',
                marginLeft: SIZES.base,
                color: COLORS.white,
                ...FONTS.h3,
              }}>
              {label}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const MainLayout = ({selectedTab, navigation, dispatchSelectedTab}) => {
  const flatListContentRef = useRef();
  const progress = useDrawerProgress();

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};

  useEffect(() => {
    if (selectedTab) {
      flatListContentRef?.current?.scrollToIndex({
        index: screenIndex[selectedTab] || 0,
      });
      console.log('selectedTab: ', screenIndex[selectedTab], selectedTab);
    }
  }, [selectedTab]);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: COLORS.white,
          flex: 1,
          ...animatedStyle,
        },
      ]}>
      {/* header */}
      <Header
        title={selectedTab.toUpperCase()}
        style={{
          height: 40,
          marginTop: 20,
          paddingHorizontal: SIZES.padding,
        }}
        leftComponent={
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              width: 40,
              height: 40,
              borderColor: COLORS.gray2,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: SIZES.base,
            }}>
            <Image source={icons.menu} style={{}} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity>
            <Image
              source={dummyData.myProfile.profile_image}
              style={{width: 40, height: 40, borderRadius: SIZES.base}}
            />
          </TouchableOpacity>
        }
      />

      {/* Content */}
      <View style={{flex: 1}}>
        <FlatList
          ref={flatListContentRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  height: SIZES.height,
                  width: SIZES.width,
                }}>
                {(() => {
                  switch (item.label) {
                    case constants.screens.home:
                      return <Home />;

                    case constants.screens.search:
                      return <Search />;

                    case constants.screens.cart:
                      return <Cart />;

                    case constants.screens.favourite:
                      return <Favorite />;

                    case constants.screens.notification:
                      return <Notification />;

                    default:
                      return <></>;
                  }
                })()}
              </View>
            );
          }}
        />
      </View>

      {/* footer */}
      <View
        style={{
          height: 100,
          justifyContent: 'flex-end',
        }}>
        {/* shadow */}
        <LinearGradient
          colors={[COLORS.transparent, COLORS.lightGray1]}
          style={{
            position: 'absolute',
            top: -20,
            left: 0,
            height: 100,
            width: SIZES.width,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />
        {/* tabs */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: SIZES.padding,
            paddingBottom: 10,
          }}>
          <TabButton
            label={constants.screens.home}
            icon={icons.home}
            isFocused={selectedTab === constants.screens.home}
            onPress={() => {
              dispatchSelectedTab(constants.screens.home);
            }}
          />

          <TabButton
            label={constants.screens.search}
            icon={icons.search}
            isFocused={selectedTab === constants.screens.search}
            onPress={() => {
              dispatchSelectedTab(constants.screens.search);
            }}
          />

          <TabButton
            label={constants.screens.cart}
            icon={icons.cart}
            isFocused={selectedTab === constants.screens.cart}
            onPress={() => {
              dispatchSelectedTab(constants.screens.cart);
            }}
          />

          <TabButton
            label={constants.screens.favourite}
            icon={icons.favourite}
            isFocused={selectedTab === constants.screens.favourite}
            onPress={() => {
              dispatchSelectedTab(constants.screens.favourite);
            }}
          />

          <TabButton
            label={constants.screens.notification}
            icon={icons.notification}
            isFocused={selectedTab === constants.screens.notification}
            onPress={() => {
              dispatchSelectedTab(constants.screens.notification);
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const mapState = state => {
  return {
    selectedTab: state.tabReducer.selectedTab,
  };
};

const mapDispatch = (dispatch, props) => {
  return {
    dispatchSelectedTab: tab => dispatch(setSelectedTab(tab)),
  };
};

const screenIndex = constants.bottom_tabs.reduce((pre, val, index) => {
  pre[val.label] = index;
  return pre;
}, {});

export default connect(mapState, mapDispatch)(MainLayout);
