import {
  View,
  Text,
  ListRenderItemInfo,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {IProducts} from '../interface/Interface';
import FavouriteList from '../components/FavouriteList';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

const FavouriteScreen = () => {
  const favourites = useSelector((props: RootState) => props.product);
  const favouritesData = favourites.products;

  const renderProducts = (
    renderProductsInfo: ListRenderItemInfo<IProducts>,
  ) => {
    const {item} = renderProductsInfo;
    return (
      <FavouriteList
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
      {favouritesData.length > 0 ? (
        <FlatList data={favouritesData} renderItem={renderProducts} />
      ) : (
        <Text style={styles.emptyMessage}>No Favourites Yet!</Text>
      )}
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  emptyMessage: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
