import React, { FC, useState } from 'react';
import { Button, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { login, signup } from '../utils/auth';

import IOSButton from '../components/IOSButton';


interface AuthScreenProps { onStateChange: Function }

const AuthScreen: FC<AuthScreenProps> = ({ onStateChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleChangeLogin = (text: string) => {
    setEmail(text);
  }

  const handleChangePassword = (text: string) => {
    setPassword(text);
  }

  const authHandler = async () => {
    Keyboard.dismiss();
    if (isSignUp) await signup(email, password);
    else await login(email, password);
    setEmail('');
    setPassword('');
    onStateChange();
  }

  const toggleSignUp = () => {
    setIsSignUp(prev => !prev)
  }

  return (
    <View style={styles.authContainer}>
      <Text
        style={[styles.text, styles.title]} >
        Please {isSignUp ? 'Sign Up' : 'Login'}
      </Text>
      <TextInput
        autoCapitalize='none'
        style={styles.input}
        value={email}
        onChangeText={handleChangeLogin}
        placeholder='Email'

      />
      {/* <Text style={styles.text} >Password</Text> */}
      <TextInput
        secureTextEntry autoCapitalize='none'
        style={styles.input} value={password}
        onChangeText={handleChangePassword}
        placeholder='Password'
      />
      <IOSButton
        title={isSignUp ? 'Sign Up' : 'Login'}
        color='blue'
        onPress={authHandler}
        style={styles.authButton}
        positionStyle={styles.authButtonContainer}
        disabled={false}
      />
      <View style={styles.toggleSignUpContainer}>
        <Text
          style={styles.toggleSignUpText} >
          {isSignUp ? 'Already have an account?' : 'No account yet?'}
        </Text>
        <IOSButton
          title={isSignUp ? 'Login' : 'Sign Up'}
          color='blue'
          onPress={toggleSignUp}
          style={[styles.toggleSignUpText, styles.authButton]}
          positionStyle={styles.toggleSignUpButton}
          disabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    width: 350,

  },
  authButton: {
    textShadowRadius: 1,
    textShadowColor: 'black',
  },
  authButtonContainer: {
    height: 100
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 30,
    fontFamily: "Cochin-Bold",
    width: 300,
    marginBottom: 50,
  },
  toggleSignUpText: {
    fontSize: 25,
    fontFamily: "Cochin-Bold",
  },
  toggleSignUpButton: {
    height: 100,
    marginTop: 50,
  },
  toggleSignUpContainer: {
    marginTop: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitButton: {
    // fontSize: 50,
  },
  text: {
    fontFamily: "Cochin-Bold",
    fontSize: 30,
    marginBottom: 20,
  },
  title: {
    marginBottom: 50,
    fontFamily: "Cochin-Bold",

  },

})

export default AuthScreen;