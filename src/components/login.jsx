import React, {createContext, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, View, Text, Image, Button, StyleSheet, Alert} from 'react-native';
import Input from './input';
import ErrorText from './common/errorText';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import SignUp from './SignUp';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
// import Home from './Home';
const Stack = createNativeStackNavigator();
import * as Yup from 'yup';
import {Formik} from 'formik';
import Header from './common/Header';
import {globalContext} from '../../App';
const Login = props => {
  const navigation = useNavigation();
  // <Stack.Navigator>
  //   <Stack.Screen name="SignUp" component={SignUp} />
  //   <Stack.Screen name="Home" component={Home} />
  // </Stack.Navigator>;
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Please enter your password'),
  });
  const [email, setEmail] = useState('');
  const emailHandle = text => {
    setEmail(text);
  };
  const {user, setUser} = useContext(globalContext);
  const handleSubmitMy = async () => {
    const existingUserData = await AsyncStorage.getItem(email);
    if (existingUserData !== null) {
      Alert.alert('Login Successful 🎉🎉');
      await AsyncStorage.setItem('currUser', email);
      setUser(email);
      // navigation.navigate('Home');
    } else {
      Alert.alert('User not found, Redirecting to Sign-Up Page');
      navigation.push('SignUp');
    }
  };
  const pageName = 'Login';

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={validationSchema}
      validateOnMount={true}
      onSubmit={values => console.log(values)}>
      {({handleChange, handleBlur, values, errors, touched}) => (
        <ScrollView>
          <Header navigation={navigation} pageTitle={pageName} />
          <View style={styles.container}>
            {/* <Text style={styles.txt}>Login</Text> */}
            <View style={styles.img}>
              <Image style={styles.icon} source={require('../components/user.png')} />
            </View>
            <Input
              onChangeText={text => {
                handleChange('email')(text);
                emailHandle(text);
              }}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Email"
            />
            {errors.email && touched.email && <ErrorText str={errors.email} />}
            <Input
              onChangeText={text => {
                handleChange('password')(text);
              }}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={true}
              placeholder="Password"
            />
            {errors.password && touched.password && <ErrorText str={errors.password} />}
            <View style={styles.btn}>
              <Button title="Submit" onPress={() => handleSubmitMy()} />
            </View>
            <View>
              <Text style={{fontSize: 20}}>New user? </Text>
              <Button title="Signup now" onPress={() => props.navigation.navigate('SignUp')} />
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  btn: {
    borderRadius: 20,
    backgroundColor: 'Red',
    width: '100%',
    marginBottom: 20,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#5F6A6A',
    borderWidth: 2,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  icon: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  txt: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addImgBtn: {
    width: 100,
    height: 100,
  },
  errors: {
    color: '#EE4B2B',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
  },
});

export default Login;
