import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MovieItem = ({ movieTitle, chat }: { movieTitle: string, chat: Function }) => {
  const showChatList = () => {
    chat(movieTitle);
  };
  return (
    <View style={[styles.moviesContainer, styles.boxShadow]}>
      <TouchableOpacity style={styles.titleContainer} onPress={showChatList}>
        <Text style={styles.movieTitle}>{movieTitle}</Text>
        <FontAwesome name="arrow-right" size={25} color="cornflowerblue" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'ghostwhite',
    borderColor: 'darkblue',
    shadowColor: "crimson",
    shadowOpacity: 0.36,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    elevation: 5,
  },
  moviesContainer: {
    justifyContent: "space-around",
    alignItems: 'flex-start',
    marginTop: 20,
    marginHorizontal: 10,
    padding: 14

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
