import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const WeatherImage = props => {
  return (
    <View style={styles.container}>
      <Image source={props.WeatherImage} style={styles.image} />
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

export default WeatherImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '35%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    textAlign: 'center',
    width: '100%',
  },
});
