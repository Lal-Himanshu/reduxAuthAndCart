import {useState} from 'react';
import {FlatList, Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import jsonData from '../../data/flatListData';
import {useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../../redux/action';
const FlatListComp = ({orientation}) => {
  const initialButtonStates = {};

  jsonData.forEach(item => {
    const temp = Number(item.id);
    initialButtonStates[temp] = true;
  });
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  function handleAddToCart(item) {
    setCartItems(prevItems => {
      if (prevItems.includes(item)) {
        dispatch(removeFromCart(item));
        return prevItems.filter(itemx => itemx !== item);
      } else {
        dispatch(addToCart(item));

        return [...prevItems, item];
      }
    });
  }
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <View style={styles.view1}>
        <Image style={styles.image} source={{uri: item.download_url}} resizeMode="cover" />
      </View>
      <TouchableOpacity style={styles.view2} onPress={() => handleAddToCart(item)}>
        <Text style={styles.cartIcon}>{cartItems.includes(item) ? '-' : '+'}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.vi}>
      <FlatList
        data={jsonData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal={orientation}
      />
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
