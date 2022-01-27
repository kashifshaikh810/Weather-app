import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  Pressable,
} from 'react-native';

const Header = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.name}</Text>
      {props.title && (
        <View style={styles.buttonContainer}>
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
                <Text style={styles.text}>{props.title}</Text>
              </>
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: Dimensions.get('window').height / 15,
    backgroundColor: '#00aaff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 25,
  },
  buttonContainer: {
    position: 'absolute',
    right: 12,
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
