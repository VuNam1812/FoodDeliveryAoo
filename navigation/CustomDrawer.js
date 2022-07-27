import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect, useDispatch, useSelector} from 'react-redux';
import {COLORS, constants, dummyData, FONTS, icons, SIZES} from '../constants';
import {setSelectedTab} from '../redux/tabSlice';
import MainLayout from '../screens/MainLayout';
const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({label, icon, isFocused = false, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          height: 40,
          backgroundColor: 'trasparent',
          flexDirection: 'row',
          marginBottom: SIZES.base,
          paddingLeft: SIZES.padding / 1.5,
          borderRadius: SIZES.base,
          alignItems: 'center',
        },
        {backgroundColor: isFocused ? COLORS.transparentBlack1 : 'transparent'},
      ]}>
      <Image
        source={icon}
        style={{tintColor: COLORS.white, width: 20, height: 20}}
      />
      <Text
        style={{
          marginLeft: SIZES.radius,
          color: COLORS.white,
          fontWeight: 'bold',
          ...FONTS.body3,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const DrawerContent = ({navigation, selectedTab, setSelectedTab}) => {
  return (
    <DrawerContentScrollView scrollEnabled contentContainerStyle={{flex: 1}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.radius,
        }}>
        {/* Close */}
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
            }}>
            <Image
              source={icons.cross}
              style={{width: 35, height: 35, tintColor: COLORS.white}}
            />
          </TouchableOpacity>
        </View>
        {/* Profile */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            alignItems: 'center',
          }}>
          <Image
            source={dummyData.myProfile.profile_image}
            style={{width: 50, height: 50, borderRadius: SIZES.radius}}
          />
          <View style={{marginLeft: SIZES.radius}}>
            <Text
              style={{color: COLORS.white, ...FONTS.h3, fontWeight: 'bold'}}>
              {dummyData.myProfile.name}
            </Text>
            <Text style={{color: COLORS.white, ...FONTS.body4}}>
              View My Profile
            </Text>
          </View>
        </TouchableOpacity>
        {/* Drawer items */}
        <View
          style={{
            marginTop: SIZES.padding,
            flex: 1,
          }}>
          <CustomDrawerItem
            isFocused={selectedTab === constants.screens.home}
            onPress={() => {
              setSelectedTab(constants.screens.home);
              navigation.navigate('MainLayout');
            }}
            icon={icons.home}
            label={constants.screens.home}
          />
          <CustomDrawerItem
            isFocused={selectedTab === constants.screens.my_wallet}
            onPress={() => {
              setSelectedTab(constants.screens.my_wallet);
              navigation.navigate('MainLayout');
            }}
            icon={icons.wallet}
            label={constants.screens.my_wallet}
          />
          <CustomDrawerItem
            isFocused={selectedTab === constants.screens.notification}
            onPress={() => {
              setSelectedTab(constants.screens.notification);

              navigation.navigate('MainLayout');
            }}
            icon={icons.notification}
            label={constants.screens.notification}
          />
          <CustomDrawerItem
            isFocused={selectedTab === constants.screens.favourite}
            onPress={() => {
              setSelectedTab(constants.screens.favourite);

              navigation.navigate('MainLayout');
            }}
            icon={icons.favourite}
            label={constants.screens.favourite}
          />

          {/* break line */}
          <View
            style={{
              backgroundColor: COLORS.lightGray1,
              marginVertical: SIZES.radius,
              width: '100%',
              height: 2,
            }}></View>

          <CustomDrawerItem icon={icons.location} label={'Track your order'} />

          <CustomDrawerItem icon={icons.coupon} label={'Coupons'} />

          <CustomDrawerItem icon={icons.setting} label="Setting" />

          <CustomDrawerItem icon={icons.profile} label="Invite a friend" />

          <CustomDrawerItem icon={icons.help} label="Help center" />
        </View>

        <View>
          <CustomDrawerItem icon={icons.logout} label="Log out" />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawer = ({selectedTab, dispatchSelectedTab}) => {
  return (
    <View style={{backgroundColor: COLORS.primary, flex: 1}}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          drawerStyle: {
            flex: 1,
            width: '65%',
            backgroundColor: 'transparent',
            paddingRight: 20,
          },
          overlayColor: 'transparent',
          sceneContainerStyle: {
            backgroundColor: 'transparent',
          },
        }}
        drawerContent={props => {
          return (
            <DrawerContent
              selectedTab={selectedTab}
              setSelectedTab={dispatchSelectedTab}
              navigation={props.navigation}
            />
          );
        }}
        useLegacyImplementation>
        <Drawer.Screen name="MainLayout">
          {props => <MainLayout {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
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

export default connect(mapState, mapDispatch)(CustomDrawer);
