// Header.js

import React, {createContext, useContext, useState} from 'react';
import {View, Text, Image, StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {globalContext} from '../../../App';
const Header = props => {
  const navigation = useNavigation();
  const hasBack = navigation.canGoBack();
  const {cartCount} = useContext(globalContext);
  console.log('cartCount', cartCount);
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
      {/* <Image style={styles.cartIcon} source={require('../../Images/add-to-cart.png')} /> */}
      {/* //--------------------------------------------- */}
      <View style={styles.item}>
        {/* First View */}
        <View style={styles.view1}>
          <Image style={styles.cartIcon} source={require('../../Images/add-to-cart.png')} />
        </View>

        {/* Second View - Positioned on top right corner of view1 */}
        <View style={styles.textCont}>
          <Text style={styles.text}>{cartCount !== 0 ? cartCount : '+'}</Text>
        </View>
      </View>
      {/* //-------------------------------------------------- */}
    </View>
  );
};
/*
textCont: {
        position: 'absolute',
        zIndex: 100,
        marginTop: 20,
        marginLeft: 6,
        height: 28,
        width: 28,
        borderRadius: 14,
        backgroundColor: 'black',
    },
    text: {
        color: 'white',
        fontSize: 20,
        borderRadius: 50,
        alignSelf: 'center',
    }
*/

const styles = StyleSheet.create({
  // --------------------------------------
  textCont: {
    position: 'absolute',
    zIndex: 100,
    // marginTop: 4,
    // marginLeft: 25,
    // marginBottom: 50,
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
  //-------------------------------------
  //-------------------------------------
  item: {
    flexDirection: 'row', // Align views horizontally
    alignItems: 'center', // Align items vertically
  },
  view1: {
    marginRight: 9, // Space between view1 and view2
  },
  view2: {
    position: 'absolute', // Position view2 absolutely
    backgroundColor: 'red', // Example background color
    borderRadius: 100, // Example border radius
    padding: 7,
    // borderWidth: 2,
    // borderColor: 'white',
  },
  topRight: {
    top: 0, // Align view2 to the top
    right: 9, // Align view2 to the right
  },
  headerCartIcon: {
    fontSize: 15,
    color: 'white', // Example text color
    fontWeight: 'bold', // Example font weight
  },
  //-------------------

  // item: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   // alignItems: 'center',
  //   // marginRight: 20,
  //   width: 50,
  //   height: 50,
  // },
  // view1: {
  //   flex: 1,
  //   width: '100%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // view2: {
  //   position: 'absolute',
  //   top: 0,
  //   right: 15,
  //   width: 50,
  //   height: 50,
  //   backgroundColor: '#FF69B4',
  //   borderRadius: 100,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // headerCartIcon: {
  //   position: 'absolute',
  //   textAlign: 'center',
  //   textAlignVertical: 'center',
  //   fontSize: 40,
  //   fontWeight: '900',
  // },
  //--------------------------------
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
