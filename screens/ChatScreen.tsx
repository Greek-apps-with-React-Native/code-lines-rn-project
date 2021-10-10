import * as React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import IOSButton from '../components/IOSButton';

const ChatScreen = ({ chat, chatTitle }: { chat: Function, chatTitle: string }) => {
  const [comment, setComment] = React.useState('');

  const showChatList = () => {
    chat();
  };

  const handleCommentChange = () => {

  }
  const commentHanlder = () => {

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
            onChangeText={handleCommentChange}
            placeholder='Write your comment'
          />
          <IOSButton
            title="Send"
            color='cornflowerblue'
            onPress={commentHanlder}
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