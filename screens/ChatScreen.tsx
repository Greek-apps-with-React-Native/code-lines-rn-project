import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

const ChatScreen = ({ chat }: { chat: Function }) => {
  const showChatList = () => {
    chat();
  };
  return (
    <View style={styles.chatContainer}>
      <TouchableOpacity style={styles.backArrowContainer} onPress={showChatList}>
        <FontAwesome name="arrow-left" size={35} color="cornflowerblue" />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    justifyContent: "space-around",
    marginTop: 10,
  },
  // movieTitle: {
  //   fontFamily: "EuphemiaUCAS-Bold",
  //   fontSize: 25,
  //   color: "cornflowerblue",
  //   marginRight: 10,
  // },
  backArrowContainer: {
    position: 'absolute',
    top: 50,
    left: -180
  },
});

export default ChatScreen;