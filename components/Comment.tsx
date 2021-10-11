import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Comment({ comment, index }: { comment: any, index: number }) {
  return (
    <View key={comment.user + index} style={styles.container} >
      <View style={styles.nameDateContainer} >
        <Text style={[styles.text, styles.user]} >{comment.user.slice(0, 3)}</Text>
        <Text style={[styles.text, styles.date]} >{comment.date}</Text>
      </View>
      <Text style={[styles.text, styles.comment]} >{comment.comment}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  comment: {
    marginTop: 10,
  },
  container: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 25,
    backgroundColor: 'gainsboro',
    paddingVertical: 10,
  },
  date: {
    marginLeft: 20,
    fontSize: 18,
  },
  nameDateContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
  },
  text: {
    fontFamily: "Cochin",
    fontSize: 20,
    marginLeft: 20,

  },
  user: {
    color: 'cadetblue',
    fontFamily: "Cochin-Bold",
    fontSize: 25,
  }
})