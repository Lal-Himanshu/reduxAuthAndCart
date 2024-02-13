import React from 'react';
import {Text, StyleSheet, Button, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from './common/Header';
const pageName = 'Krenai';
const Krenai = props => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Header navigation={navigation} pageTitle={pageName} />
      <Text style={{fontSize: 45, marginTop: 80, color: '#000000'}}>Welcome to Krenai</Text>
      <Text
        style={{fontSize: 15, marginTop: 5, marginLeft: 6, marginRight: 9, textAlign: 'center'}}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam perspiciatis perferendis
        libero sequi voluptatibus debitis magnam dicta consequuntur sapiente error. Rem sit
        voluptate minima. Fuga deserunt harum magni dolores facilis, accusantium impedit doloribus
        praesentium perferendis magnam, soluta alias a ipsam quis quam perspiciatis iste iusto.
        Vitae cumque voluptate eaque reprehenderit.{' '}
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={() => props.navigation.navigate('SignUp')} />
        <View style={{width: 30}} />
        <Button title="Login" onPress={() => props.navigation.navigate('Login')} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 30,
  },
});

export default Krenai;
