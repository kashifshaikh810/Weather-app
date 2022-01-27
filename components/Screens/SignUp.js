import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import {Auth, Database} from '../FirebaseConfig';
import Button from './Button';
import Header from './Header';
import WeatherImage from './WeatherImage';

const SignUp = props => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErr, setShowErr] = useState('');

  const submit = () => {
    if (userName && email && password) {
      setIsLoading(true);
      Auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({user}) => {
          Database()
            .ref(`/newUser/${user.uid}`)
            .set({userName: userName, email: email, password: password});
          Auth().signOut();
          setUserName('');
          setEmail('');
          setPassword('');
          setIsLoading(false);
          props.navigation.navigate('signIn');
          Alert.alert('SignUp Success.', 'you are successfully signUp', [
            {
              text: 'Cancel',
            },
            {text: 'OK'},
          ]);
        })
        .catch(err => {
          if (err.code === 'auth/email-already-in-use') {
            setShowErr('The email address is already use by another account');
          } else if (err.code === 'auth/invalid-email') {
            setShowErr('The email address is invalid');
          } else {
            setShowErr('The password length is greater then 6');
          }
          setIsLoading(false);
        });
    }
  };

  const userNameFunc = text => {
    setUserName(text);
    setShowErr('');
  };

  const emailFunc = text => {
    setEmail(text);
    setShowErr('');
  };

  const passwordFunc = text => {
    setPassword(text);
    setShowErr('');
  };

  return (
    <View style={styles.container}>
      <Header name="Sign Up" />
      <WeatherImage
        WeatherImage={require('../assists/images/test.jpg')}
        text="Weather ToDay"
      />

      <TextInput
        placeholder="userName"
        keyboardType="default"
        selectionColor="#00aaff"
        value={userName}
        style={styles.textInput}
        onChangeText={text => userNameFunc(text)}
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
        selectionColor="#00aaff"
        value={password}
        secureTextEntry
        style={styles.textInput}
        onChangeText={text => passwordFunc(text)}
      />

      {showErr ? <Text style={styles.errText}>{showErr}</Text> : null}

      <View style={styles.newAccountTextContainer}>
        <Text style={styles.newText}>Already have an account?</Text>
        <Pressable
          onPress={() => props.navigation.navigate('signIn')}
          style={({pressed}) => [
            {backgroundColor: pressed ? '#b3b3b3' : '#fff'},
          ]}>
          <Text style={styles.signUpText}>SignIn</Text>
        </Pressable>
      </View>

      <View style={styles.button}>
        <Button
          title="Sign Up"
          onPress={() => submit()}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default SignUp;

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
