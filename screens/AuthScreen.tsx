import React, { FC, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { login, signup } from '../utils/auth';

import IOSButton from '../components/IOSButton';
import defaultStyles from '../styles/defaultStyles';

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
    onStateChange(); // to hide the AuthScreen
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
        autoFocus
        autoCapitalize='none'
        style={[styles.input, defaultStyles.boxShadow]}
        value={email}
        onChangeText={handleChangeLogin}
        placeholder='Email'
      />
      <TextInput
        secureTextEntry autoCapitalize='none'
        style={[styles.input, defaultStyles.boxShadow]} value={password}
        onChangeText={handleChangePassword}
        placeholder='Password'
      />
      <IOSButton
        title={isSignUp ? 'Sign Up' : 'Login'}
        color='darkblue'
        onPress={authHandler}
        style={styles.authButton}
        disabled={false}
      />
      <View style={styles.toggleSignUpContainer}>
        <Text
          style={styles.toggleSignUpText} >
          {isSignUp ? 'Already have an account?' : 'No account yet?'}
        </Text>
        <IOSButton
          title={isSignUp ? 'Login' : 'Sign Up'}
          color='darkblue'
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
    flex: 1,
    width: 350,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authButton: {
    textShadowRadius: 1,
    textShadowColor: 'crimson',
  },
  input: {
    borderBottomColor: 'crimson',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 25,
    fontFamily: "Cochin-Bold",
    width: 300,
    marginBottom: 50,
    padding: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: "Cochin-Bold",
    fontSize: 30,
    marginBottom: 20,
  },
  title: {
    marginBottom: 50,
    fontFamily: "Cochin-Bold",
    color: 'cornflowerblue',
  },

})

export default AuthScreen;