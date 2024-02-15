import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from './src/components/screens/SignUp';
import Login from './src/components/screens/login';
import Krenai from './src/components/screens/krenai';
import Home from './src/components/screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from './src/components/screens/cartItem';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from './src/redux/authReducer';
const Stack = createNativeStackNavigator();
const App = () => {
  const userNow = useSelector(state => state.rootReducer.authReducer);
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('currUser');
      dispatch(setUser(user));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, [userNow]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userNow ? (
          <>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Stack.Screen name="CartItem" component={CartItem} options={{headerShown: false}} />
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
  );
};
export default App;
