import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IProducts} from '../interface/Interface';
import {RouteProp, useRoute} from '@react-navigation/native';
import {navigationStackList} from '../navigation/navigationStackList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {
  AddFavourites,
  RemoveFavourites,
} from '../store/FavouriteReducer/FavouriteReducer';
import axios from 'axios';
import {
  addProducts,
  removeProducts,
} from '../store/ProductReducer/ProductReducer';

const DetailScreen = () => {
  const [isAdded, SetIsAdded] = useState(false);
  const [isLoading, SetIsLoading] = useState(true);
  const [isBtnClick, SetIsBtnClick] = useState(false);
  const [product, SetProduct] = useState<IProducts>({
    id: 0,
    description: '',
    image: '',
    price: 0,
    title: '',
  });
  const dispatch = useDispatch();
  const favourite = useSelector((state: RootState) => state.favourite);
  const route = useRoute<RouteProp<navigationStackList, 'DetailScreen'>>();
  const {id} = route.params;
  const url = 'https://fakestoreapi.com/products/';
  const getSingleData = async () => {
    const response = await axios.get(url + id.id);
    const data: IProducts = response.data;
    return data;
  };
  const ToggleFavorite = async () => {
    if (isAdded) {
      dispatch(RemoveFavourites(id));
      dispatch(removeProducts(id));
      SetIsAdded(false);
    } else {
      const detailID = id;
      const data: IProducts = await getSingleData();
      dispatch(AddFavourites([detailID]));
      dispatch(addProducts(data));
      SetIsAdded(true);
    }
  };
  const checkIsAdded = () => {
    favourite.ids.forEach(item => {
      if (item.id === id.id) {
        SetIsAdded(true);
        return;
      }
    });
  };
  const getDetail = async () => {
    SetIsLoading(true);
    try {
      const data: IProducts = await getSingleData();
      SetProduct({
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
      });
      checkIsAdded();
      SetIsLoading(false);
    } catch (e) {
      console.log('ERROR', e);
    }
    checkIsAdded();
  };
  const ToggleFavouriteHandler = async () => {
    SetIsBtnClick(true);
    await ToggleFavorite();
    SetIsBtnClick(false);
  };
  useEffect(() => {
    const getDetailHandler = async () => {
      await getDetail();
    };
    getDetailHandler();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={'large'} style={styles.loadingContainer} />
      ) : (
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
          {isBtnClick ? (
            <ActivityIndicator style={styles.loadingBtn} size={'large'} />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => ToggleFavouriteHandler()}>
              <Text style={styles.buttonText}>
                {isAdded ? 'Remove from Favourites' : 'Add to Favourites'}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
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
  loadingContainer: {
    display: 'flex',
    flex: 1,
  },
  loadingBtn: {
    marginBottom: 30,
  },
});
