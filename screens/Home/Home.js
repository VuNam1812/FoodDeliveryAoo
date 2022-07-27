import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { HorizontalFoodItem, VerticalFoodItem } from '../../components';
import { COLORS, dummyData, FONTS, icons, SIZES } from '../../constants';
import FilterSearch from './FilterSearch';

const Section = ({ title, onPress, children }) => {
  return <View style={{ width: SIZES.width, marginTop: SIZES.padding }}>
    <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
      <Text style={{ fontWeight: 'bold', ...FONTS.h3 }}>{title}</Text>
      <Text style={{ fontWeight: 'bold', color: COLORS.primary, ...FONTS.body3 }}>Show all</Text>
    </View>
    <View >
      {children}
    </View>
  </View>
}

const Home = () => {

  const [categoryId, setCategoryId] = React.useState(1);
  const [menuType, setMenuType] = React.useState(1);
  const [menuList, setMenuList] = React.useState([]);
  const [popularList, setPopularList] = React.useState([]);
  const [recommendedList, setRecommendedList] = React.useState([]);

  const [showFilter, setShowFilter] = React.useState(false);

  React.useEffect(() => {
    handleChangeMenu(categoryId, menuType);
  }, [menuType, categoryId])


  const handleChangeMenu = (catId, menuId) => {
    const menu = dummyData.menu.find(val => +val.id === +menuId);

    const popular = dummyData.menu.find(val => val.name === 'Popular');

    const recommended = dummyData.menu.find(val => val.name === 'Recommended');


    setMenuList(menu.list.filter(val => val.categories.includes(+catId)));

    setPopularList(popular.list.filter(val => val.categories.includes(+catId)));

    setRecommendedList(recommended.list.filter(val => val.categories.includes(+catId)));

  }

  //#region search component
  const renderSearch = () => {
    return <View style={{ width: SIZES.width }}>
      <View style={{
        height: 40,
        flexDirection: 'row',
        paddingHorizontal: SIZES.base,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.radius,
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.base,

      }}>
        <Image source={icons.search} style={{ width: 20, height: 20, tintColor: COLORS.black }} />
        <TextInput placeholder='Search food' style={{ flex: 1, paddingHorizontal: SIZES.base }} />
        <TouchableOpacity onPress={() => setShowFilter(true)}>
          <Image source={icons.filter} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
    </View>
  }
  //#endregion

  //#region headerMenu component
  const renderHeaderMenu = () => {
    return <View>
      <FlatList
        horizontal
        style={{ paddingHorizontal: SIZES.padding, marginTop: SIZES.padding }}
        contentContainerStyle={{ paddingRight: SIZES.padding }}
        showsHorizontalScrollIndicator={false}
        data={dummyData.menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <TouchableOpacity onPress={() => {
            setMenuType(item.id)
          }} style={{ marginRight: SIZES.padding }}>
            <Text style={[{ fontWeight: "bold", color: menuType === item.id ? COLORS.primary : COLORS.darkGray, ...FONTS.body3 }]}>{item.name}</Text>
          </TouchableOpacity>
        }}

      />
    </View>
  }
  //#endregion

  //#region categoryMenu component
  const renderCategoryMenu = () => {
    return <View>
      <FlatList
        horizontal
        style={{ paddingHorizontal: SIZES.padding, marginTop: SIZES.base }}
        contentContainerStyle={{ paddingRight: SIZES.padding }}
        showsHorizontalScrollIndicator={false}
        data={dummyData.categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <TouchableOpacity style={[{ marginRight: SIZES.padding, flexDirection: 'row', alignItems: 'center', borderRadius: SIZES.radius }, {
            backgroundColor: categoryId === item.id ? COLORS.primary : COLORS.lightGray2
          }]} onPress={() => {
            setCategoryId(item.id)
          }}>
            <Image source={item.icon} style={{ marginTop: 5, width: 50, height: 50 }} />
            <Text style={[{ fontWeight: "bold", paddingRight: SIZES.padding, ...FONTS.h3 }, {
              color: categoryId === item.id ? COLORS.white : COLORS.darkGray,
            }]}>{item.name}</Text>
          </TouchableOpacity>
        }}

      />
    </View>
  }
  //#endregion

  //#region PopularNearMenu component
  const renderPopularNearMenu = () => {
    return <Section
      title='Popular Near you'
    >
      <FlatList
        data={popularList}
        horizontal
        pagingEnabled
        style={{ paddingHorizontal: SIZES.padding, marginTop: SIZES.base }}
        contentContainerStyle={{ paddingRight: SIZES.padding }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return <HorizontalFoodItem
            food={item}
            style={{
              backgroundColor: COLORS.lightGray2,
              marginTop: SIZES.padding / 2,
              width: SIZES.width * 0.8,
              marginRight: SIZES.padding,
            }} imageStyle={{ height: 110, width: 110 }}
          />
        }}
      />
    </Section>
  }
  //#endregion

  //#region RecommendMenu component
  const renderRecommendMenu = () => {
    return <Section
      title='Recommned'
    >
      <FlatList
        data={recommendedList}
        horizontal
        style={{ paddingHorizontal: SIZES.padding, marginTop: SIZES.base }}
        contentContainerStyle={{ paddingRight: SIZES.padding }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return <VerticalFoodItem
            food={item}
            style={{
              alignItems: 'center',
              backgroundColor: COLORS.lightGray2,
              marginTop: SIZES.padding / 2,
              width: SIZES.width * 0.5,
              borderRadius: SIZES.radius,
              marginRight: SIZES.padding,
            }} imageStyle={{ height: 150, width: 150 }}
          />
        }}
      />
    </Section>
  }
  //#endregion

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {renderSearch()}

      <FilterSearch
        show={showFilter}
        onClose={() => setShowFilter(false)}
      />

      {/* list */}
      <FlatList
        data={menuList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<>
          {renderCategoryMenu()}
          {renderPopularNearMenu()}
          {renderRecommendMenu()}
          {renderHeaderMenu()}
        </>}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <HorizontalFoodItem food={item} style={{
            backgroundColor: COLORS.lightGray2,
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
          }} imageStyle={{ height: 110, width: 110 }} />
        }}
        ListFooterComponent={<View style={{ marginBottom: 210 }}></View>}
      />
    </View>
  );
};

export default Home;
