import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const sendMessage = async () => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const strTime = `${hour}:${minute}`;

    const userHtml = (
      <View style={styles.userMessageContainer} key={messages.length}>
        <View style={styles.userMessage}>
          <Text>{text}</Text>
          <Text style={styles.messageTime}>{strTime}</Text>
        </View>
        <Image source={{ uri: 'https://i.ibb.co/d5b84Xw/Untitled-design.png' }} style={styles.userImage} />
      </View>
    );

    setMessages([...messages, userHtml]);
    setText('');

    try {
      const response = await fetch('https://localhost:8080/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          msg: text,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const botHtml = (
        <View style={styles.botMessageContainer} key={messages.length + 1}>
          <Image source={{uri : 'https://www.prdistribution.com/spirit/uploads/pressreleases/2019/newsreleases/d83341deb75c4c4f6b113f27b1e42cd8-chatbot-florence-already-helps-thousands-of-patients-to-remember-their-medication.png'}} style={styles.botImage} />
          <View style={styles.botMessage}>
            <Text>{data.response}</Text>
            <Text style={styles.messageTime}>{strTime}</Text>
          </View>
        </View>
      );

      setMessages([...messages, botHtml]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>{messages}</ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          onChangeText={setText}
          value={text}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: '#e5e5e5',
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  botMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  botMessage: {
    backgroundColor: '#d9edf7',
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  botImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageTime: {
    marginTop: 5,
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default ChatbotScreen;
