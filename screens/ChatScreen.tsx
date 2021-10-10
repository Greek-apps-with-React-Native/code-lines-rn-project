import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

const ChatScreen = ({ chat, chatTitle }: { chat: Function, chatTitle: string }) => {
  const showChatList = () => {
    chat();
  };
  return (
    <View style={styles.chatContainer}>
      <View style={styles.arrowTitleContainer} >
        <TouchableOpacity onPress={showChatList}>
          <FontAwesome name="arrow-left" size={30} color="cornflowerblue" />
        </TouchableOpacity>
        <Text style={styles.chatTitle} >{chatTitle}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  arrowTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 100,
    marginRight: 45,
  },
  chatTitle: {
    fontFamily: "EuphemiaUCAS-Bold",
    fontSize: 25,
    color: "darkblue",
    marginLeft: 15,
  },
  chatContainer: {
    marginTop: 10,
  },
});

export default ChatScreen;