import React, { FC, useState } from 'react';
import { Button, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { login, signup } from '../utils/auth';


interface AuthScreenProps {

}

const AuthScreen: FC<AuthScreenProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleChangeLogin = (text: string) => {
    setEmail(text);
  }

  const handleChangePassword = (text: string) => {
    setPassword(text);
  }

  const authHandler = () => {
    Keyboard.dismiss();
    if (isSignUp) signup(email, password);
    else login(email, password);
    setEmail('');
    setPassword('');
  }

  const toggleSignUp = () => {
    setIsSignUp(prev => !prev)
  }

  return (
    <View style={styles.authContainer}>
      <Text style={[styles.text, styles.title]} >Please {isSignUp ? 'Sign Up' : 'Login'}</Text>
      <Text style={styles.text} >Email</Text>
      <TextInput autoCapitalize='none' style={styles.input} value={email} onChangeText={handleChangeLogin} />
      <Text style={styles.text} >Password</Text>
      <TextInput autoCapitalize='none' style={styles.input} value={password} onChangeText={handleChangePassword} />
      <View style={styles.submitButton} >
        <Button title={isSignUp ? 'Sign Up' : 'Login'} onPress={authHandler} />
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUp} >{isSignUp ? 'Already have an account?' : 'No account yet?'} </Text>
        <Button title={isSignUp ? 'Login' : 'Sign Up'} onPress={toggleSignUp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    width: 350,
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 30,
    width: 300,
    marginBottom: 50,
  },
  signUp: {
    fontSize: 20,
  },
  signUpContainer: {
    marginTop: 80,
    flexDirection: 'row',
    alignItems: 'center'
  },
  submitButton: {
    // fontSize: 50,
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
  title: {
    marginBottom: 50,
  },

})

export default AuthScreen;