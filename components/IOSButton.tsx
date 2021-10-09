import React, { FC } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";


interface Props {
  onPress: ((event: GestureResponderEvent) => any),
  disabled: boolean,
  color: string,
  style?: object,
  title: string,
  positionStyle?: object,
}

const IOSButton: FC<Props> = ({
  onPress,
  disabled,
  color,
  style,
  title,
  positionStyle,
}) => {
  return (
    <View style={[styles.container, positionStyle]}>
      <TouchableOpacity onPress={onPress}
        disabled={disabled}
      >
        <Text
          style={[styles.text, { color: disabled ? "#888" : color }, style]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
    maxHeight: "70%",
  },
  text: {
    fontFamily: "Cochin-Bold",
    textAlign: "center",
    fontSize: 30,
    padding: 10,
  },
});

export default IOSButton;