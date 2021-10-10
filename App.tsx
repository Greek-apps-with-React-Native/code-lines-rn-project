import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';

import IOSButton from './components/IOSButton';

import { movies } from './constants/movies';
import storageKeys from './constants/storageKeys';

import { logout } from './utils/auth';

import MovieItem from './screens/MovieItem';
import AuthScreen from './screens/AuthScreen';
import ChatScreen from './screens/ChatScreen';

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [moviesTitles, setMoviesTitles] = useState<string[]>([]);
  const [showChatScreen, setShowChatScreen] = useState(false);
  const [chatMovTitle, setChatMovTitle] = useState('');

  const checkUserState = async () => {
    const userData = await AsyncStorage.getItem(storageKeys.userData);
    if (!!userData) setUserLoggedIn(true);
    else setUserLoggedIn(false);
  }

  useEffect(() => {
    checkUserState()
  });

  const logoutHanlder = async () => {
    await logout()
    checkUserState(); // to show AuthScreen
    setShowChatScreen(false);
  }

  useEffect(() => {
    const movTitles = movies.slice(0, 10).map(movie => movie.title)

    setMoviesTitles(movTitles);
  }, [movies]);

  const chatHandler = (title: string) => {
    setChatMovTitle(title);
    setShowChatScreen(prev => !prev)
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topBar} >

        {
          userLoggedIn ?
            <IOSButton
              title="Logout"
              color='red'
              onPress={logoutHanlder}
              style={styles.logoutButton}
              positionStyle={styles.logoutButtonContainer}
              disabled={false}
            /> :
            null
        }
      </View>
      <View style={styles.body} >
        {
          !userLoggedIn ?
            <AuthScreen onStateChange={checkUserState} /> :
            null
        }
        {
          userLoggedIn && !showChatScreen ?

            <View style={styles.movieListContainer} >
              <Text style={styles.moviesListHeadTitle} >Movies List</Text>
              {
                moviesTitles.map((title, idx) => <MovieItem key={title + idx} movieTitle={title} chat={chatHandler} />)
              }
            </View>
            :
            null
        }
        {
          showChatScreen ?
            <ChatScreen chat={chatHandler} chatTitle={chatMovTitle} /> :
            null
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 10
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    textShadowRadius: 1,
    textShadowColor: 'black',
    fontSize: 25,
  },
  logoutButtonContainer: {
    marginTop: 40,
    marginRight: -300,
    height: 100,
  },
  moviesListHeadTitle: {
    fontFamily: 'EuphemiaUCAS-Bold',
    fontSize: 35,
    marginTop: 100,
    color: 'darkblue'
  },
  movieListContainer: {
    marginBottom: 30
  },
  topBar: {
    flex: 1
  }
});
