import React, { useEffect } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

import IOSButton from '../components/IOSButton';
import Comment from '../components/Comment';
import storageKeys from '../constants/storageKeys';
import sendComment from '../utils/sendComment';
import fetchComments from '../utils/fetchComments';

const ChatScreen = ({ chat, chatTitle }: { chat: Function, chatTitle: string }) => {
  const [comment, setComment] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [fetchedComments, setFetchedComments] = React.useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const userEmail = await AsyncStorage.getItem(storageKeys.email);
      if (!!userEmail) setEmail(userEmail)
    })()
  });

  useEffect(() => {
    (async () => {
      const comments = await fetchComments(chatTitle);
      setFetchedComments(comments);
    })()
  }, [chatTitle, comment]);

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
    }
  }
  return (
    <View style={styles.chatContainer}>
      <View style={styles.arrowTitleContainer} >
        <TouchableOpacity onPress={showChatList}>
          <FontAwesome name="arrow-left" size={30} color="cornflowerblue" />
        </TouchableOpacity>
        <Text style={styles.chatTitle} >{chatTitle}</Text>
      </View>
      <View style={styles.chatBody} >
        <View style={styles.commentsContainer} >
          {displayComments()}
        </View>
        <View style={styles.commentForm} >
          <TextInput
            autoFocus
            multiline
            numberOfLines={2}
            autoCapitalize='none'
            style={styles.input}
            value={comment}
            onChangeText={commentChangeHandler}
            placeholder='Write your comment...'
          />
          <IOSButton
            title="Send"
            color='cornflowerblue'
            onPress={sendMessageHandler}
            style={styles.commentButton}
            positionStyle={styles.commentButtonContainer}
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
    marginTop: 40,
    marginRight: 45,
  },
  chatBody: {
    width: 350,
    height: '90%',
  },
  chatHeader: {

  },
  chatTitle: {
    fontFamily: "EuphemiaUCAS-Bold",
    fontSize: 25,
    color: "darkblue",
    marginLeft: 15,
  },
  chatContainer: {
    flex: 1,
    // backgroundColor: 'gainsboro'
  },
  commentButton: {
    marginBottom: 25,
  },
  commentButtonContainer: {

  },
  commentForm: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  commentsContainer: {
    height: '75%',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
  },
  input: {
    borderBottomColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 25,
    padding: 20,
    fontFamily: "Cochin",
    width: 250,
    height: 100,
  },
});

export default ChatScreen;