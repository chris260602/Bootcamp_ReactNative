import {
  View,
  Text,
  FlatList,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ItemList from '../components/ItemList';
import {IProducts} from '../interface/Interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {navigationStackList} from '../navigation/navigationStackList';
const HomeScreen = () => {
  const [Products, SetProducts] = useState<IProducts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getDataHandler = async () => {
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'GET',
    });
    const data = response.json();
    return data;
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
    // backgroundColor: 'red',
  },
  loadingContainer: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
