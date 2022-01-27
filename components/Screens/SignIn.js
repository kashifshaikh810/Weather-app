import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Auth, Database} from '../FirebaseConfig';
import Button from './Button';
import Header from './Header';
import WeatherImage from './WeatherImage';

const SignIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErr, setShowErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let uid = Auth()?.currentUser?.uid;

  const submit = () => {
    if (email && password) {
      setIsLoading(true);
      Auth()
        .signInWithEmailAndPassword(email, password)
        .then(({user}) => {
          Database()
            .ref(`/userSignIn/${user.uid}`)
            .set({email: email, password: password});
          setEmail('');
          setPassword('');
          setIsLoading(false);
          props.navigation.navigate('Tab');
          Alert.alert(
            'SignIn Success.',
            'you are successfully signIn, Check your country weather and enjoy',
            [
              {
                text: 'Cancel',
              },
              {text: 'OK'},
            ],
          );
        })
        .catch(err => {
          setIsLoading(false);
          if (err.code === 'auth/invalid-email') {
            setShowErr('The email address is badly formatted');
          } else if (err.code === 'auth/wrong-password') {
            setShowErr('The password is invalid');
          } else if (err.code === 'auth/user-not-found') {
            setShowErr('This user not found, Please signUp and try again');
          }
        });
    }
  };

  const emailFunc = text => {
    setEmail(text);
    setShowErr('');
  };
  const passwordFunc = text => {
    setPassword(text);
    setShowErr('');
  };

  if (uid) {
    props.navigation.replace('Tab');
  }
  return (
    <View style={styles.container}>
      <Header name="Sign In" />
      <WeatherImage
        WeatherImage={require('../assists/images/test.jpg')}
        text="Weather ToDay"
      />

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        selectionColor="#00aaff"
        value={email}
        style={styles.textInput}
        onChangeText={text => emailFunc(text)}
      />

      <TextInput
        placeholder="Password"
        value={password}
        selectionColor="#00aaff"
        secureTextEntry={true}
        style={styles.textInput}
        onChangeText={text => passwordFunc(text)}
      />

      {showErr ? <Text style={styles.errText}>{showErr}</Text> : null}

      <View style={styles.newAccountTextContainer}>
        <Text style={styles.newText}>Create new account?</Text>
        <Pressable
          onPress={() => props.navigation.navigate('signUp')}
          style={({pressed}) => [
            {backgroundColor: pressed ? '#b3b3b3' : '#fff'},
          ]}>
          <Text style={styles.signUpText}>SignUp</Text>
        </Pressable>
      </View>

      <View style={styles.button}>
        <Button
          title="Sign In"
          onPress={() => submit()}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 20,
    marginHorizontal: 10,
    borderWidth: 0.8,
    borderColor: '#00aaff',
    width: '95%',
    height: Dimensions.get('window').height / 14,
    borderRadius: 10,
  },
  button: {
    marginVertical: 10,
  },
  newAccountTextContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  newText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#00aaff',
    textDecorationLine: 'underline',
    marginHorizontal: 10,
  },
  errText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
