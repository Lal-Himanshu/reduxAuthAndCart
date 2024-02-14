import React from 'react';
import {Button, Image, ScrollView, Text, View} from 'react-native';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {removeFromCart} from '../../redux/action';
const CartItem = () => {
  const navigation = useNavigation();
  const items = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();
  function handleRemove(item) {
    dispatch(removeFromCart(item));
  }
  return (
    <View style={{backgroundColor: '#fff'}}>
      <Header navigation={navigation} pageTitle={'Your Cart'} />
      {items.length === 0 ? (
        <>
          <Text style={{fontSize: 40, textAlign: 'center', marginTop: 150}}>:( cart is empty!</Text>
          <Image style={{width: 400, height: 400}} source={require('../../Images/emptyCart.png')} />
        </>
      ) : (
        ''
      )}
      <ScrollView style={{height: 750}}>
        {items.map(item => (
          <View
            key={item.id}
            style={{
              alignItems: 'center',
              borderBottomColor: 'black',
              borderWidth: 2,
              marginBottom: 10,
            }}>
            <Image style={{width: 200, height: 200}} source={{uri: item.download_url}} />

            <Button title="Remove from cart" onPress={() => handleRemove(item)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default CartItem;
