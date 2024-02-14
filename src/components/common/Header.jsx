import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Header = props => {
  const navigation = useNavigation();
  const hasBack = navigation.canGoBack();
  const cartData = useSelector(state => state.cartReducer);
  return (
    <View style={styles.header}>
      {hasBack && (
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image style={styles.cartIcon} source={require('../../Images/arrow-left.png')} />
        </TouchableOpacity>
      )}
      <View style={styles.navbar}>
        <Text style={styles.navItem}>{props.pageTitle}</Text>
      </View>
      <View style={styles.item}>
        <TouchableOpacity onPress={() => navigation.navigate('CartItem')} style={styles.view1}>
          <Image style={styles.cartIcon} source={require('../../Images/add-to-cart.png')} />
        </TouchableOpacity>

        <View style={styles.textCont}>
          <Text style={styles.text}>{cartData.length !== 0 ? cartData.length : '+'}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textCont: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    right: 6,
    height: 25,
    width: 25,
    borderRadius: 100,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
    borderRadius: 50,
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  view1: {
    marginRight: 9,
  },
  view2: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 100,
    padding: 7,
  },
  topRight: {
    top: 0,
    right: 9,
  },
  headerCartIcon: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },

  header: {
    backgroundColor: '#fff',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
  },
  navItem: {
    color: '#000000',
    marginRight: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartIcon: {
    width: 50,
    height: 50,
  },
});

export default Header;
