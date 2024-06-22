import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styles from './app/styles';
import medlistScreen from './app/listmedicine';
import DiseasePredictionScreen from './app/diseasepredictionscreen';
import ContactFormScreen from './app/contact';
import ChatScreen from './app/chatbot';
import GeneralSymptomScreen from './app/generalsymptoms';

const Stack = createStackNavigator();

const StartScreen = ({ navigation }) => {
  const handleStartPress = () => {  
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.description, styles.healthAppText]}>Health App</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleStartPress}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );

};

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerStyle: { backgroundColor: '#DAD7CD' }, headerTintColor: '#003C43', headerLeft:null }} />
          <Stack.Screen name="Medicine List" component={medlistScreen}options={{ headerStyle: { backgroundColor: '#DAD7CD' }, headerTintColor: '#003C43',headerLeft:null }} />
          <Stack.Screen name="Contact Form" component={ContactFormScreen}options={{ headerStyle: { backgroundColor: '#DAD7CD' }, headerTintColor: '#003C43', headerLeft:null }} />
          <Stack.Screen name="Disease Prediction System" component={DiseasePredictionScreen}options={{ headerStyle: { backgroundColor: '#135D66' }, headerTintColor: '#003C43',headerLeft:null,  }} />
          <Stack.Screen name="Chatbot" component={ChatScreen} options={{ headerStyle: { backgroundColor: '#135D66' }, headerTintColor: '#003C43', headerLeft:null }}/>
          <Stack.Screen name="GeneralSymptoms" component={GeneralSymptomScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const HomeScreen = ({ navigation }) => {
  const handleContactUsPress = () => {
    navigation.navigate('Contact Form');
  };
  
  const handlemedlistPress = () => {
    navigation.navigate('Medicine List');
  };

  const handledpPress = () => {
    navigation.navigate('Disease Prediction System');
  };

  const handleChatBotPress = () => {
    navigation.navigate('Chatbot');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('./assets/health_iconl.png')} 
          style={styles.image}
        />
        <Text style={[styles.description, { color: '#344E41' }]}>
          This app uses advanced algorithms and medical data to predict the likelihood of various diseases based on user input.{"\n\n"}
          Simply tap on one of the buttons below to start the+ prediction process.{"\n\n"}
          We also have a medicine list for you to check out if you need to find something specific for some symptom.{"\n\n"}
          And if you have any other medical query, then please let our chatbot guide you.
        </Text>

        <CustomButton title="Disease prediction" onPress={handledpPress} />
        <CustomButton title="List medicines" onPress={handlemedlistPress} />
        <CustomButton title="Chatbot" onPress={handleChatBotPress} />
        <CustomButton title="Contact us" onPress={handleContactUsPress} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 PRATEEK Inc.</Text>
      </View>
    </View>
  );
};

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default App;
