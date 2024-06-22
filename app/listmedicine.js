import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import dataset from './medicines.json';

const FindMedicinesScreen = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = () => {
    // Search logic based on the dataset
    const results = dataset.filter(item => {
      if (!item.Description || !item.Drug_Name) {
        return false; 
      }

      return (
        item.Description.toLowerCase().includes(query.toLowerCase()) ||
        item.Drug_Name.toLowerCase().includes(query.toLowerCase())
      );
    });

    if (results.length === 0) {
      setErrorMessage('No results found. Please try again!');
    } else {
      setErrorMessage('');
    }

    setSearchResults(results);
    if (onSearch) {
      onSearch(results);
    }
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.Drug_Name}</Text>
      <Text style={styles.itemDescription}>Symptoms: {item.Description}</Text>
    </TouchableOpacity>
  );

  const styles = {
    itemContainer: {
      backgroundColor: '#FFFFFF',
      padding: 15,
      marginBottom: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
    itemTitle: {
      fontSize: 18,
      color: '#344E41',
      fontWeight: 'bold',
    },
    itemDescription: {
      fontSize: 16,
      color: '#344E41',
      marginTop: 5,
    },
    searchButton: {
      backgroundColor: '#8aa8a1ff',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 20,
      marginTop: 10,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 16,
      color: '#FFFFFF',
    },
    errorMessage: {
      fontSize: 18, 
      color: '#2E8B57',
      marginTop: 10,
      textAlign: 'center',
    },
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#DAD7CD' }}>
      <View style={{ backgroundColor: '#DAD7CD', padding: 10 }}>
        <TextInput
          style={{ 
            fontSize: 16, 
            backgroundColor: 'rgba(0, 0, 0, 0.1)', 
            paddingHorizontal: 10, 
            color: '#344E41', 
            marginVertical: 10, 
            borderRadius: 15,
            height: 50,
          }}
          placeholder="Enter symptoms or medicine name"
          onChangeText={text => setQuery(text)}
          value={query}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginTop: 10 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FindMedicinesScreen;
