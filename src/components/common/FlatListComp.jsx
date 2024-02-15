import {useEffect} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../../redux/cartReducer';
import {fetchData, changeBoolState} from '../../redux/buttonReducer';
import {fetchItemData} from '../../redux/itemsData';
const FlatListComp = ({orientation}) => {
  const {data, loading} = useSelector(state => state.rootReducer.itemsData);
  const dispatch = useDispatch();
  let items = useSelector(state => state.rootReducer.buttonReducer);
  const handleChangeBoolState = item => {
    if (items[item.id] === false) {
      dispatch(addToCart(item));
    } else {
      dispatch(removeFromCart(item));
    }
    dispatch(changeBoolState(item.id));
  };
  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchItemData());
  }, [dispatch]);
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <View style={styles.view1}>
        <Image style={styles.image} source={{uri: item.download_url}} resizeMode="cover" />
      </View>
      <TouchableOpacity style={styles.view2} onPress={() => handleChangeBoolState(item)}>
        <Text style={styles.cartIcon}>{items[item.id] === false ? '+' : '-'}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.vi}>
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          horizontal={orientation}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  image: {
    flex: 1,
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 20,
  },
  view1: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view2: {
    position: 'absolute',
    top: 0,
    right: 15,
    width: 50,
    height: 50,
    backgroundColor: '#FF69B4',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    position: 'absolute',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 40,
    fontWeight: '900',
  },
  vi: {
    marginLeft: 7,
    marginTop: 4,
    marginBottom: 3,
    height: 650,
  },
});
export default FlatListComp;
