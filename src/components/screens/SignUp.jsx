import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TextInput,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Input from '../common/input';
import {launchImageLibrary} from 'react-native-image-picker';
import UserDetails from '../common/UserDetails';
import ErrorText from '../common/errorText';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';

const SignUp = props => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your First Name'),
    lastName: Yup.string().required('Please enter your Last Name'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Please enter your password'),
    confirmPass: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  const [img, setImage] = useState('');
  const addImage = async () => {
    const result = await launchImageLibrary();
    const imgPath = result.assets[0].uri;
    setImage(imgPath);
  };
  const [fname, setFname] = useState('');
  const fnameHandle = text => {
    setFname(text);
  };

  const [lname, setLname] = useState('');
  const lnameHandle = text => {
    setLname(text);
  };

  const [email, setEmail] = useState('');
  const emailHandle = text => {
    setEmail(text);
    setIsVisible(false);
  };
  const [pass, setPass] = useState('');
  const passHandle = text => {
    setPass(text);
  };
  const [addresses, setAddresses] = useState([{value: ''}]);

  const addAddressField = () => {
    setAddresses([...addresses, {value: ''}]);
  };
  const handleAddressChange = (index, newValue) => {
    const newAddresses = [...addresses];
    newAddresses[index].value = newValue;
    setAddresses(newAddresses);
  };
  const removeAddressField = index => {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
  };
  function func() {
    let str = '';
    for (let key in addresses) {
      str += addresses[key].value + ', ';
    }
    return str.substring(0, str.length - 2);
  }
  const obj = {
    firstName: fname,
    lastName: lname,
    emailAddress: email,
    password: pass,
    address: func(),
  };

  const storeUserData = async () => {
    const existingUserData = await AsyncStorage.getItem(email);
    if (existingUserData !== null) {
      Alert.alert('User Already Exists⚠️');
    } else {
      Alert.alert('User Created Successfully🎉🎉');
      await AsyncStorage.setItem(email, JSON.stringify(obj));
      await AsyncStorage.setItem('toPrint', email);
    }
  };
  const [isVisible, setIsVisible] = useState(false);
  const handleSubmitMy = submittedData => {
    storeUserData();
    navigation.navigate('Login');
  };
  const pageName = 'Sign Up';
  const navigation = useNavigation();
  return (
    <Formik
      initialValues={{firstName: '', lastName: '', email: '', password: '', confirmPass: ''}}
      validationSchema={validationSchema}
      validateOnMount={true}
      onSubmit={values => console.log(values)}>
      {({handleChange, handleBlur, values, errors, touched, onSubmit}) => (
        <ScrollView>
          <Header navigation={navigation} pageTitle={pageName} />
          <View style={styles.container}>
            <Text style={styles.txt}>Sign Up</Text>
            <TouchableOpacity onPress={addImage}>
              <View style={styles.img}>
                {img === '' ? (
                  <Image style={styles.icon} source={require('./../../Images/dpChange.png')} />
                ) : (
                  <Image
                    style={styles.img}
                    source={{
                      uri: img,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>

            <Input
              onChangeText={text => {
                handleChange('firstName')(text);
                fnameHandle(text);
              }}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              placeholder="First Name"
            />
            {errors.firstName && touched.firstName && <ErrorText str={errors.firstName} />}
            <Input
              onChangeText={text => {
                handleChange('lastName')(text);
                lnameHandle(text);
              }}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              placeholder="Last name"
            />
            {errors.lastName && touched.lastName && <ErrorText str={errors.lastName} />}
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
                passHandle(text);
              }}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry={true}
              placeholder="Password"
            />
            {errors.password && touched.password && <ErrorText str={errors.password} />}
            <Input
              onChangeText={text => {
                handleChange('confirmPass')(text);
              }}
              onBlur={handleBlur('confirmPass')}
              value={values.confirmPass}
              secureTextEntry={true}
              placeholder="Confirm Password"
            />
            {errors.confirmPass && touched.confirmPass && <ErrorText str={errors.confirmPass} />}
            {addresses.map((address, index) => (
              <View
                key={index}
                style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                <TextInput
                  style={{
                    flex: 1,
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    borderRadius: 30,
                    textAlign: 'center',
                  }}
                  value={address.value}
                  onChangeText={text => {
                    handleAddressChange(index, text);
                  }}
                  placeholder={`Address Line ${index + 1}`}
                />
                {index > 0 && (
                  <TouchableOpacity onPress={() => removeAddressField(index)}>
                    <View
                      style={{
                        borderRadius: 50,
                        marginLeft: 5,
                        backgroundColor: '#2196F3',
                      }}>
                      <Text style={{padding: 10, color: '#fff'}}>Remove</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <View style={styles.btn}>
              <Button title="Add Addres Field" onPress={addAddressField} />
            </View>
            <View style={styles.btn}>
              <Button title="Submit" onPress={() => handleSubmitMy(obj)} />
            </View>
            <View>
              <Text style={{fontSize: 20}}>Already a user? </Text>
              <Button title="Login now" onPress={() => props.navigation.navigate('Login')} />
            </View>
            {isVisible && <UserDetails data={email} />}
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

export default SignUp;
