import React, { FC } from "react";
import { Image, Animated, StyleSheet } from "react-native";



interface Props { }

const MoviesImage: FC<Props> = () => {
  return (
    <Animated.View style={[styles.imageView]}>
      <Image
        source={require("../assets/movies-img.jpeg")}
        style={styles.image}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 300,
    width: 400,
    borderColor: 'darkblue',
    borderWidth: 1,
    borderRadius: 25,
    resizeMode: "cover",
    transform: [{ scale: 0.7 }, { rotate: '-15deg' }],
  },
  imageView: {
    height: 300,
    width: 400,
    shadowColor: 'crimson',
    shadowOpacity: 0.888,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 22,
    elevation: 7,
  },
});

export default MoviesImage;