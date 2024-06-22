import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';

const ContactFormScreen = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');

  const handleSubmit = () => {
    console.log('Name:', name);
    console.log('Number:', number);
    console.log('Address:', address);
    console.log('Medical Condition:', medicalCondition);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Name:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
        </View>
        <Text style={styles.label}>Phone Number:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={number}
            onChangeText={setNumber}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          /> 
        </View>
        <Text style={styles.label}>Address:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            multiline
            numberOfLines={3}
          />
        </View>
        <Text style={styles.label}>Medical Condition:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.medicalInput]}
            value={medicalCondition}
            onChangeText={setMedicalCondition}
            placeholder="Describe your medical condition"
            multiline
            numberOfLines={5}
          />
        </View>
        <Button
          title="Submit"
          onPress={handleSubmit}
          color="#8aa8a1ff"
        />
        <Text style={styles.contactInfo}>
          For any inquiries, please contact us at: prateek21b@iiitg.ac.in
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAD7CD',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#344E41',
  },
  inputContainer: {
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8aa8a1ff',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  input: {
    fontSize: 16,
    minHeight: 40,
  },
  medicalInput: {
    minHeight: 120,
  },
  buttonContainer: {
    marginTop: 10,
  },
  contactInfo: {
    marginTop: 20,
    fontSize: 14,
    color: '#344E41',
    textAlign: 'center',
  },
});

export default ContactFormScreen;
