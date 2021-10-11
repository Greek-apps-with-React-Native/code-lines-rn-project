import React, { useEffect } from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, _ScrollView } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

import IOSButton from '../components/IOSButton';
import Comment from '../components/Comment';
import storageKeys from '../constants/storageKeys';
import sendComment from '../utils/sendComment';
import fetchComments from '../utils/fetchComments';
import defaultStyles from '../styles/defaultStyles';

const ChatScreen = ({ chat, chatTitle }: { chat: Function, chatTitle: string }) => {
  const [comment, setComment] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [fetchedComments, setFetchedComments] = React.useState<Array<any>>([]);
  const [commentIsSent, setCommentIsSent] = React.useState(false);

  useEffect(() => {
    (async () => {
      const userEmail = await AsyncStorage.getItem(storageKeys.email);
      if (!!userEmail) setEmail(userEmail)
    })()
  });

  useEffect(() => {
    console.log('useEffect');

    (async () => {
      const comments = await fetchComments(chatTitle);
      setFetchedComments(comments);
    })()
  }, [chatTitle, commentIsSent]);

  const displayComments = () => {
    return fetchedComments.map((comment: any, index: number) => (
      <Comment comment={comment} index={index} />
    ))
  }

  const showChatList = () => {
    chat();
  };

  const commentChangeHandler = (text: string) => {
    setComment(text);
  }
  const sendMessageHandler = () => {
    if (!comment.trim().length) {
      Alert.alert('Emply comment', 'Please write something.')
    } else {
      sendComment(chatTitle, comment, email);
      setComment('');
      setCommentIsSent(prev => !prev);
    }
  }
  return (
    <View>
      <View style={styles.arrowTitleContainer} >
        <TouchableOpacity onPress={showChatList}>
          <FontAwesome name="arrow-left" size={30} color="cornflowerblue" />
        </TouchableOpacity>
        <Text style={styles.chatTitle} >{chatTitle}</Text>
      </View>
      <View style={styles.chatBody} >
        <View style={[styles.commentsContainer, defaultStyles.boxShadow]} >
          <ScrollView>
            {displayComments()}
          </ScrollView>
        </View>
        <View style={styles.commentForm} >
          <TextInput
            autoFocus
            multiline
            numberOfLines={2}
            autoCapitalize='none'
            style={[styles.input, defaultStyles.boxShadow]}
            value={comment}
            onChangeText={commentChangeHandler}
            placeholder='Write your comment...'
          />
          <IOSButton
            title="Send"
            color='cornflowerblue'
            onPress={sendMessageHandler}
            style={styles.commentButton}
            disabled={false}
          />
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  arrowTitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 20,
    marginRight: 45,
  },
  chatBody: {
    width: 350,
    height: '90%',
  },
  chatTitle: {
    fontFamily: "EuphemiaUCAS-Bold",
    fontSize: 25,
    color: "darkblue",
    marginLeft: 15,
  },
  commentButton: {
    marginBottom: 25,
    fontSize: 30,
    textShadowRadius: 1,
    textShadowColor: 'crimson',
  },
  commentForm: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  commentsContainer: {
    height: '75%',
    maxHeight: '75%',
    marginTop: 20,
  },
  input: {
    backgroundColor: 'ghostwhite',
    borderColor: 'crimson',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 25,
    padding: 20,
    fontFamily: "Cochin",
    width: '95%',
    height: 100,
  },
});

export default ChatScreen;