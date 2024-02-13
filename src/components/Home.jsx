import React, {useContext} from 'react';
import {Alert, Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from './common/Header';
import {useNavigation} from '@react-navigation/native';
import FlatListComp from './FlatListComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalContext} from '../../App';
const Home = () => {
  const pageName = 'Home';
  const navigation = useNavigation();
  const {setUser} = useContext(globalContext);
  const {setCartCount} = useContext(globalContext);
  async function removeUser() {
    Alert.alert('User Logged Out');
    await AsyncStorage.removeItem('currUser');
    setUser(null);
    setCartCount(0);
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
