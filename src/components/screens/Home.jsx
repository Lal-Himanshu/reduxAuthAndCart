import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import FlatListComp from '../common/FlatListComp';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/authReducer';
const Home = () => {
  const pageName = 'Home';
  const navigation = useNavigation();

  const dispatch = useDispatch();
  async function removeUser() {
    Alert.alert('User Logged Out');
    await AsyncStorage.removeItem('currUser');
    dispatch(setUser(null));
  }
  return (
    <SafeAreaView>
      <Header navigation={navigation} pageTitle={pageName} />
      <View>
        <Text style={styles.heading}>Snapshots</Text>
      </View>
      <FlatListComp orientation={false} />
      <Button title="Logout" onPress={() => removeUser()} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    color: '#3498db',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
});
export default Home;
