import {useContext, useEffect, useState} from 'react';
import {FlatList, Text, Button, StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import jsonData from './data';
// import {cartContext} from './common/Header';
import {globalContext} from '../../App';
const FlatListComp = ({orientation}) => {
  // const {setCartCount} = useContext(cartContext);
  const {cartCount, setCartCount} = useContext(globalContext);
  // const [jsonData, setData] = useState([]);

  // const getData = async () => {
  //   const response = await fetch('https://picsum.photos/v2/list');
  //   const data = await response.json();
  //   setData(data);
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  const initialButtonStates = {};

  // Define state for button states
  jsonData.forEach(item => {
    const temp = Number(item.id);
    initialButtonStates[temp] = true;
    // console.log(temp);
    // console.log(item.id);
  });
  const [finalCount, setFinalCount] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [sign, setSign] = useState(false);
  const [buttonStates, setButtonStates] = useState(initialButtonStates);
  const handleButtonPress = buttonId => {
    {
      buttonStates[buttonId] === true
        ? setButtonStates(prevButtonStates => {
            const newButtonStates = {...prevButtonStates};
            newButtonStates[buttonId] = false;
            setSign(false);
            {
              finalCount === 0 ? setIsAdded(false) : setIsAdded(true);
            }
            // setFinalCount(finalCount + 1);
            // console.log(newButtonStates);
            setCartCount(cartCount + 1);
            return newButtonStates;
          })
        : setButtonStates(prevButtonStates => {
            const newButtonStates = {...prevButtonStates};
            newButtonStates[buttonId] = true;
            setSign(true);
            // setFinalCount(finalCount - 1);
            {
              finalCount === 0 ? setIsAdded(false) : setIsAdded(true);
            }
            // console.log(newButtonStates);
            setCartCount(cartCount - 1);
            return newButtonStates;
          });
    }
    // useEffect(() => {
    //   if (sign === true) {
    //     setFinalCount(finalCount - 1);
    //   } else {
    //     setFinalCount(finalCount + 1);
    //   }
    //   // console.log()
    // }, [sign]);
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <View style={styles.view1}>
        <Image style={styles.image} source={{uri: item.download_url}} resizeMode="cover" />
      </View>
      <TouchableOpacity style={styles.view2} onPress={() => handleButtonPress(item.id)}>
        <Text style={styles.cartIcon}>{buttonStates[item.id] ? '+' : '-'}</Text>
      </TouchableOpacity>
    </View>
  );
  console.log('finalCount', finalCount);
  return (
    <View style={styles.vi}>
      <FlatList
        data={jsonData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal={orientation}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  image: {
    flex: 1,
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 20,
  },
  view1: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view2: {
    position: 'absolute',
    top: 0,
    right: 15,
    width: 50,
    height: 50,
    backgroundColor: '#FF69B4',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    position: 'absolute',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 40,
    fontWeight: '900',
    //--------------------------------
  },
  vi: {
    marginLeft: 7,
    marginTop: 4,
    marginBottom: 3,
    height: 650,
  },
});
export default FlatListComp;
