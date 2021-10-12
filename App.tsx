import React, { useEffect, useState } from 'react';
import { AsyncStorage, FlatList, StyleSheet, Text, View } from 'react-native';

import IOSButton from './components/IOSButton';

import { movies } from './constants/movies';
import storageKeys from './constants/storageKeys';

import { logout } from './utils/auth';

import MovieItem from './screens/MovieItem';
import AuthScreen from './screens/AuthScreen';
import ChatScreen from './screens/ChatScreen';
import MoviesImage from './components/MoviesImage';

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [moviesTitles, setMoviesTitles] = useState<string[]>([]);
  const [showChatScreen, setShowChatScreen] = useState(false);
  const [chatMovTitle, setChatMovTitle] = useState('');
  const [dataSlice, setDataSlice] = useState<object[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const checkUserState = async () => {
    const userData = await AsyncStorage.getItem(storageKeys.userData);
    if (!!userData) setUserLoggedIn(true);
    else setUserLoggedIn(false)
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

  const renderMoviesList = ({ item }: any) =>
    <MovieItem movieTitle={item.title} chat={chatHandler} />

  // Code for loading only the first 10 winner and then each time user scrolls 10 more...
  const loadMore = () => {
    const ITEMS_PER_PAGE = 10; // what is the batch size you want to load.
    setPageNumber(prev => prev + 1);
    const start = pageNumber * ITEMS_PER_PAGE;
    const end = (pageNumber + 1) * ITEMS_PER_PAGE - 1;

    const newData = movies && movies.slice(start, end); // here, we will receive next batch of the items
    setDataSlice([...dataSlice, ...newData]); // here we are appending new batch to existing batch
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topBar} >
        {!userLoggedIn ? <Text style={styles.movieChat} >MovieChat</Text> : null}
        {
          userLoggedIn ?
            <IOSButton
              title="Logout"
              color='crimson'
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
            <View style={styles.authScreen} >
              <MoviesImage />
              <AuthScreen onStateChange={checkUserState} />
            </View> :
            null
        }
        {
          userLoggedIn && !showChatScreen ?
            <View style={styles.movieListContainer} >
              <Text style={styles.moviesListHeadTitle} >Movies List</Text>
              <FlatList
                data={movies}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderMoviesList}
                onEndReached={loadMore}
              />
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
  authScreen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 10
  },
  screenContainer: {
    flex: 1,
    backgroundColor: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    textShadowRadius: 1,
    textShadowColor: 'darkblue',
    fontSize: 25,
  },
  logoutButtonContainer: {
    marginTop: 40,
    marginRight: -300,
    height: 100,
  },
  movieChat: {
    fontFamily: 'EuphemiaUCAS-Bold',
    fontSize: 35,
    marginTop: 40,
    color: 'darkblue',
    alignSelf: 'center'
  },
  moviesListHeadTitle: {
    fontFamily: 'EuphemiaUCAS-Bold',
    fontSize: 35,
    marginTop: 20,
    color: 'darkblue',
    alignSelf: 'center'
  },
  movieListContainer: {
    marginBottom: 30,
    marginHorizontal: 20,
  },
  topBar: {
    flex: 1.5
  }
});
