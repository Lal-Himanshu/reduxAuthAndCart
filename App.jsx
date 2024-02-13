import React, {createContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from './src/components/SignUp';
import Login from './src/components/login';
import Krenai from './src/components/krenai';
import Home from './src/components/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();
export const globalContext = createContext();
const App = () => {
  const [user, setUser] = useState();
  const [storedUser, setStoredUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  async function getData() {
    const storedEmail = await AsyncStorage.getItem('currUser');
    setStoredUser(storedEmail);
  }
  useEffect(() => {
    getData();
  }, [user]);
  return (
    <globalContext.Provider value={{user, setUser, cartCount, setCartCount}}>
      <NavigationContainer>
        <Stack.Navigator>
          {storedUser ? (
            <>
              <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Krenai"
                component={Krenai}
                style={{alignItems: 'center'}}
                options={{headerShown: false}}
              />
              <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
              <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </globalContext.Provider>
  );
};
export default App;
