import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Auth} from '../FirebaseConfig';
import {getSearch, getUserData} from '../redux/Action';
import Header from './Header';

const Home = props => {
  const [info, setInfo] = useState({
    name: 'loading !!',
    temp: 'loading',
    humidity: 'loading',
    desc: 'loading',
    icon: 'loading',
  });

  const {searchCity, userData} = useSelector(state => state.reducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getSearch());
    getWeather();

    return () => {
      console.log('clean');
    };
  }, [searchCity]);

  const getWeather = () => {
    if (searchCity) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&APPID=46a9246bebba16d42b36aac3fc3ba8af&units=metric`,
      )
        .then(data => data.json())
        .then(res => {
          setInfo({
            name: res?.name,
            temp: res?.main?.temp,
            humidity: res?.main?.humidity,
            desc: res?.weather[0]?.description,
            icon: res?.weather[0]?.icon,
          });
        })
        .catch(err => {
          console.log('Weather API err', err);
        });
    }
  };

  const logOut = async () => {
    await Auth()
      .signOut()
      .then(res => {
        props.navigation.navigate('signIn');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Header name="Weather App" title="Log Out" onPress={() => logOut()} />
      <ScrollView>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>
            Welcome, {userData.userName} ❇️
          </Text>
        </View>
        <View style={styles.nameAndImageContainer}>
          <Text style={styles.cardText}>Country : {info.name}</Text>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{uri: `https://openweathermap.org/img/w/${info.icon}.png`}}
          />
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardText}>👉🏼 Temperature - {info.temp}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>👉🏼 Humidity - {info.humidity}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardText}>👉🏼 Description - {info.desc}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nameAndImageContainer: {
    width: '100%',
    height: Dimensions.get('window').height / 2.5,
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  cardContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    elevation: 5,
    height: Dimensions.get('window').height / 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 15,
  },
  cardText: {
    fontSize: 25,
    color: '#00aaff',
  },
  welcomeTextContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height / 15,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: '800',
  },
});
