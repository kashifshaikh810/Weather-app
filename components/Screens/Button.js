import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import SaveIcon from 'react-native-vector-icons/FontAwesome5';

const Button = props => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={props.onPress}
        style={({pressed}) => [
          styles.button,
          {
            backgroundColor: pressed ? '#fff' : '#00aaff',
          },
        ]}>
        {props.isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <SaveIcon name="save" size={20} color="#fff" />
            <Text style={styles.text}>{props.title}</Text>
          </>
        )}
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginHorizontal: 10,
    height: Dimensions.get('window').height / 16,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  button: {
    height: Dimensions.get('window').height / 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    paddingHorizontal: 10,
  },
});
