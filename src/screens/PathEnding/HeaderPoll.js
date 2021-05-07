import React, { useState } from 'react';
import {View, Text, Pressable } from 'react-native';

export default ({ onVote }) => {
  const [vote, setVote] = useState();
  return (
    <View style={styles.pollContainer}>
      <Text>Now tell me, how do you feel?</Text>
      <Pressable
        style={{
          backgroundColor: vote === '1' ? 'gray' : 'transparent'
        }}
        onPress={() => setVote('1')}
      >
        <Text style={{}}>😩</Text>
        <Text style={{}}>
          Stressed
        </Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: vote === '1' ? 'gray' : 'transparent'
        }}
        onPress={() => setVote('2')}
      >
        <Text style={{}}>😕</Text>
        <Text style={{}}>
          Bored
        </Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: vote === '1' ? 'gray' : 'transparent'
        }}
        onPress={() => setVote('3')}
      >
        <Text style={{}}>😡</Text>
        <Text style={{}}>
          Angry
        </Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: vote === '1' ? 'gray' : 'transparent'
        }}
        onPress={() => setVote('4')}
      >
        <Text style={{}}>😄</Text>
        <Text style={{}}>
          Happy
        </Text>
      </Pressable>
    </View>
  )
}