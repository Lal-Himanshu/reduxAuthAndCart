import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDetails = props => {
  const [tempData, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(props.data);
        console.log(props.data);
        console.log(jsonValue);
        setData(jsonValue);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <View>
      {props.data && true && (
        <View>
          <Text style={{fontSize: 30}}>User Details {tempData}</Text>
          {/* <Text>Last Name: {data.lastName}</Text>
          <Text>Email Address: {data.emailAddress}</Text>
          <Text>Password: {data.password}</Text>
          <Text>Address: {data.address}</Text> */}
        </View>
      )}
    </View>
  );
};

export default UserDetails;
