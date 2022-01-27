import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import Header from './Header';
import Button from './Button';
import {useDispatch} from 'react-redux';
import {searchPost} from '../redux/Action';

const Search = props => {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();

  const fetchCities = text => {
    setCity(text);
    fetch(
      `https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=${text}&locationType=city&format=json`,
    )
      .then(item => item.json())
      .then(cityData => {
        setCities(cityData?.location?.address?.slice(0, 10));
      });
  };

  const buttonClick = () => {
    if (city) {
      dispatch(searchPost(city));
      props.navigation.navigate('home');
      setCity('');
      setCities([]);
    }
  };

  const listClick = cityName => {
    setCity(cityName);
    dispatch(searchPost(cityName));
    props.navigation.navigate('home');
    setCities([]);
    setCity('');
  };

  return (
    <View style={styles.container}>
      <Header name="Search" />
      <TextInput
        placeholder="City name"
        placeholderTextColor="#00aaff"
        value={city}
        onChangeText={text => fetchCities(text)}
        style={styles.textInput}
      />
      <Button title="Save Changes" onPress={buttonClick} />
      <ScrollView>
        {cities &&
          cities.map((item, index) => {
            return (
              <Pressable
                onPress={() => listClick(item)}
                key={index}
                android_ripple={{color: '#fff'}}
                style={({pressed}) => [
                  styles.pressable,
                  {
                    backgroundColor: pressed ? '#b3b3b3' : '#fff',
                  },
                ]}>
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>👉🏼 {item}</Text>
                </View>
              </Pressable>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 0.8,
    borderColor: '#00aaff',
    width: '95%',
    height: Dimensions.get('window').height / 14,
    borderRadius: 10,
  },
  pressable: {
    width: '95%',
    height: Dimensions.get('window').height / 15,
    alignSelf: 'center',
    elevation: 4,
    justifyContent: 'center',
    marginVertical: 10,
  },
  itemContainer: {
    paddingHorizontal: 10,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
