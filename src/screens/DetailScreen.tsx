import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {IProducts} from '../interface/Interface';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {navigationStackList} from '../navigation/navigationStackList';

const DetailScreen = (props: IProducts) => {
  const route = useRoute<RouteProp<navigationStackList, 'DetailScreen'>>();
  const {product} = route.params;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{uri: product.image}} style={styles.imageItem} />
        </View>
        <View style={styles.ItemContainer}>
          <View style={styles.childContainer}>
            <Text style={styles.productID}>ID: {product.id}</Text>
          </View>
          <View style={styles.childContainer}>
            <Text style={styles.MainTitle}>Title</Text>
            <Text style={styles.title}>{product.title}</Text>
          </View>
          <View style={styles.childContainer}>
            <Text style={styles.price}>${product.price}</Text>
          </View>
          <View style={styles.childContainer}>
            <Text style={styles.MainTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>[Add to/Remove from] Favourite</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  childContainer: {
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 5,
  },
  imageContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageItem: {
    width: '100%',
    height: 300,
  },
  ItemContainer: {
    display: 'flex',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  productID: {
    fontSize: 16,
    fontWeight: '600',
  },
  MainTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  description: {fontSize: 20},
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 15,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
