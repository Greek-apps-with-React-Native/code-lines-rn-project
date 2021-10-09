import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MovieItem = ({ movieTitle }) => {
  return (
    <View style={styles.moviesContainer}>
      <Text style={styles.movieTitle}>{movieTitle}</Text>
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
    fontSize: 20,
    color: "cornflowerblue",
  },
});

export default MovieItem;
