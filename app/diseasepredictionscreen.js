import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const symptoms = [
  "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering", "chills", "joint_pain", "stomach_pain",
  "acidity", "ulcers_on_tongue", "muscle_wasting", "vomiting", "burning_micturition", "spotting_ urination", "fatigue", "weight_gain",
  "anxiety", "cold_hands_and_feets", "mood_swings", "weight_loss", "restlessness", "lethargy", "patches_in_throat", "irregular_sugar_level",
  "cough", "high_fever", "sunken_eyes", "breathlessness", "sweating", "dehydration", "indigestion", "headache", "yellowish_skin",
  "dark_urine", "nausea", "loss_of_appetite", "pain_behind_the_eyes", "back_pain", "constipation", "abdominal_pain", "diarrhoea",
  "mild_fever", "yellow_urine", "yellowing_of_eyes", "acute_liver_failure", "fluid_overload", "swelling_of_stomach", "swelled_lymph_nodes",
  "malaise", "blurred_and_distorted_vision", "phlegm", "throat_irritation", "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion",
  "chest_pain", "weakness_in_limbs", "fast_heart_rate", "pain_during_bowel_movements", "pain_in_anal_region", "bloody_stool", "irritation_in_anus",
  "neck_pain", "dizziness", "cramps", "bruising", "obesity", "swollen_legs", "swollen_blood_vessels", "puffy_face_and_eyes", "enlarged_thyroid",
  "brittle_nails", "swollen_extremeties", "excessive_hunger", "extra_marital_contacts", "drying_and_tingling_lips", "slurred_speech", "knee_pain",
  "hip_joint_pain", "muscle_weakness", "stiff_neck", "swelling_joints", "movement_stiffness", "spinning_movements", "loss_of_balance", "unsteadiness",
  "weakness_of_one_body_side", "loss_of_smell", "bladder_discomfort", "foul_smell_of urine", "continuous_feel_of_urine", "passage_of_gases",
  "internal_itching", "toxic_look_(typhos)", "depression", "irritability", "muscle_pain", "altered_sensorium", "red_spots_over_body",
  "belly_pain", "abnormal_menstruation", "dischromic _patches", "watering_from_eyes", "increased_appetite", "polyuria", "family_history",
  "mucoid_sputum", "rusty_sputum", "lack_of_concentration", "visual_disturbances", "receiving_blood_transfusion", "receiving_unsterile_injections",
  "coma", "stomach_bleeding", "distention_of_abdomen", "history_of_alcohol_consumption", "fluid_overload", "blood_in_sputum", "prominent_veins_on_calf",
  "palpitations", "painful_walking", "pus_filled_pimples", "blackheads", "scurring", "skin_peeling", "silver_like_dusting", "small_dents_in_nails",
  "inflammatory_nails", "blister", "red_sore_around_nose", "yellow_crust_ooze"
];

const QuestionnairePage = () => {
  const [symptomsData, setSymptomsData] = useState(symptoms.map(symptom => ({ name: symptom, selected: false })));

  const handleAnswer = (index) => {
    setSymptomsData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], selected: !newData[index].selected };
      return newData;
    });
  };

  const submitAnswers = () => {
    const answeredSymptoms = symptomsData.filter(symptom => symptom.selected).map(symptom => symptom.name);
    console.log("Symptoms answered yes:", answeredSymptoms);
    const symptomsDataToSend = { symptoms: answeredSymptoms };
    
    fetch('http://localhost:8080', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(symptomsDataToSend),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const renderSymptomTile = ({ item, index }) => {
    return (
      <TouchableOpacity 
        onPress={() => handleAnswer(index)} 
        style={[
          styles.symptomContainer, 
          symptomsData[index].selected && styles.selectedSymptom, 
          symptomsData[index].selected && { backgroundColor: '#003C43' } 
        ]}
        activeOpacity={0.6} 
        activeBackgroundColor="#003C43" 
      >
        <Text style={styles.questionText}>{item.name.replace(/_/g, ' ').toUpperCase()}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Please proceed to choose your symptoms</Text>
        <TouchableOpacity 
          style={styles.goButton} 
          onPress={submitAnswers}
        >
          <Text style={styles.buttonText}>Go</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={symptomsData}
        renderItem={renderSymptomTile}
        keyExtractor={(item) => item.name}
        numColumns={3}
        contentContainerStyle={styles.scrollView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#135D66',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E3FEF7',
  },
  goButton: {
    backgroundColor: '#003C43',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollView: {
    paddingVertical: 10,
  },
  symptomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: '#135D66',
  },
  selectedSymptom: {
    backgroundColor: '#81b0ff',
  },
  questionText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#E3FEF7',
    textAlign: 'center',
  },
});

export default QuestionnairePage;
