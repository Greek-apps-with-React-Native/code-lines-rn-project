import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MovieItem = ({ movieTitle, chat }: { movieTitle: string, chat: Function }) => {
  const showChatList = () => {
    chat();
  };
  return (
    <View style={styles.moviesContainer}>
      <TouchableOpacity style={styles.titleContainer} onPress={showChatList}>
        <Text style={styles.movieTitle}>{movieTitle}</Text>
        <FontAwesome name="arrow-right" size={25} color="cornflowerblue" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  moviesContainer: {
    flex: 1,
    justifyContent: "space-around",
    marginTop: 10,
  },
  movieTitle: {
    fontFamily: "EuphemiaUCAS-Bold",
    fontSize: 25,
    color: "cornflowerblue",
    marginRight: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default MovieItem;
