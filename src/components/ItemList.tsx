import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React from 'react';
import {IProducts} from '../interface/Interface';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {navigationStackList} from '../navigation/navigationStackList';

const ItemList = (props: IProducts) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<navigationStackList, 'HomeScreen'>
    >();
  const navigateProduct = (ProductDesc: IProducts) => {
    navigation.navigate('DetailScreen', {
      product: ProductDesc,
    });
  };
  const ProductDesc: IProducts = {
    id: props.id,
    title: props.title,
    description: props.description,
    price: props.price,
    image: props.image,
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigateProduct(ProductDesc)}>
      <View style={styles.imageContainer}>
        <Image source={{uri: props.image}} style={styles.imageItem} />
      </View>
      <View style={styles.ItemContainer}>
        {/* <Text>ID: {props.id}</Text> */}
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>Price: ${props.price}</Text>
        <Text>Description: {props.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'grey',
    margin: 10,
    padding: 10,
    flex: 1,
    borderRadius: 20,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageItem: {
    width: 120,
    height: 120,
    marginRight: 10,
  },
  ItemContainer: {
    display: 'flex',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
});
