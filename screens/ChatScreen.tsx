import React, { useEffect } from 'react';
import { Alert, AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

import IOSButton from '../components/IOSButton';
import sendMessage from '../utils/sendMessage';
import storageKeys from '../constants/storageKeys';

const ChatScreen = ({ chat, chatTitle }: { chat: Function, chatTitle: string }) => {
  const [comment, setComment] = React.useState('');
  const [email, setEmail] = React.useState('');

  useEffect(() => {
    (async () => {
      const userEmail = await AsyncStorage.getItem(storageKeys.email);
      if (!!userEmail) setEmail(userEmail)
    })()
  });

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
      sendMessage(chatTitle, comment, email);
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
        <View style={styles.chatHeader} >
          <Text>Header</Text>
        </View>
        <View style={styles.commentsContainer} >
          <Text>Comments</Text>
        </View>
        <View style={styles.commentForm} >
          <Text>commentForm</Text>
          <TextInput
            autoFocus
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
    flex: 1
  },
  commentButton: {

  },
  commentButtonContainer: {

  },
  commentForm: {

  },
  commentsContainer: {

  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 30,
    fontFamily: "Cochin-Bold",
    width: 300,
    marginBottom: 50,
  },
});

export default ChatScreen;