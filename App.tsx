import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import IOSButton from './components/IOSButton';
import asyncNames from './constants/asyncNames';
import AuthScreen from './screens/AuthScreen';
import { logout } from './utils/auth';

export default function App() {
  const [loggedOut, setLoggedOut] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const checkUserState = async () => {
    const userData = await AsyncStorage.getItem(asyncNames.userData);
    if (!!userData) setUserLoggedIn(true);
    else setUserLoggedIn(false);
    console.log('--- App --- ', !!userData);
  }

  useEffect(() => {
    checkUserState()
  });

  const logoutHanlder = async () => {
    await logout()
    setLoggedOut(true);
    stateChangeHanlder();
  }

  const stateChangeHanlder = () => {
    checkUserState();
    console.log('stateChangeHanlder ',);

  }
  console.log('userLoggedIn ', userLoggedIn);

  return (
    <View style={styles.container}>
      {!userLoggedIn ? <AuthScreen onStateChange={stateChangeHanlder} /> : null}
      {userLoggedIn ? <IOSButton
        title="Logout"
        color='red'
        onPress={logoutHanlder}
        style={styles.logoutButton}
        positionStyle={styles.logoutButtonContainer}
        disabled={false}
      /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    textShadowRadius: 1,
    textShadowColor: 'black',
  },
  logoutButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    height: 100,
  }
});
