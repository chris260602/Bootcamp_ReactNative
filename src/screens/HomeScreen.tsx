import {
  View,
  Text,
  FlatList,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo,
  ActivityIndicator,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ItemList from '../components/ItemList';
import {IProducts} from '../interface/Interface';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackHeaderProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {navigationStackList} from '../navigation/navigationStackList';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {saveProducts} from '../store/ProductReducer/ProductReducer';
import {RootState} from '../store/store';
const HomeScreen = () => {
  const [Products, SetProducts] = useState<IProducts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getDataHandler = async () => {
    const url = 'https://fakestoreapi.com/products';
    const response = await axios.get(url);
    const data = response.data;
    return data;
  };

  const navigateToFavourites = () => {
    navigation.navigate('FavouriteScreen');
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const data = await getDataHandler();
      SetProducts(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<navigationStackList, 'HomeScreen'>
    >();
  navigation.setOptions({
    headerRight: () => (
      <Button title="Favourites" onPress={navigateToFavourites}></Button>
    ),
  });
  const renderProducts = (
    renderProductsInfo: ListRenderItemInfo<IProducts>,
  ) => {
    const {item} = renderProductsInfo;
    return (
      <ItemList
        id={item.id}
        title={item.title}
        description={item.description}
        price={item.price}
        image={item.image}
      />
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          style={styles.loadingContainer}
          size={'large'}></ActivityIndicator>
      ) : (
        <FlatList data={Products} renderItem={renderProducts} />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
  },
  loadingContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
