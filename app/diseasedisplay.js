import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Button, StyleSheet, ScrollView, Animated, Easing } from 'react-native';

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

const QuestionnairePage = ({ navigation }) => {
  const [answers, setAnswers] = useState({});
  const [diseaseData, setDiseaseData] = useState(null);
  const [percentage] = useState(new Animated.Value(0));

  useEffect(() => {
    
    if (Object.keys(answers).length > 0) {
      submitAnswers();
    }
  }, [answers]);

  const handleAnswer = (symptom, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [symptom]: value
    }));
  };

  const submitAnswers = () => {
    const answeredSymptoms = Object.keys(answers).filter(symptom => answers[symptom]);
    const symptomsData = { symptoms: answeredSymptoms };

    fetch('http://localhost:8080', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(symptomsData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setDiseaseData(data); // Set received disease data
      animatePercentage(data.percentage);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const animatePercentage = percentageValue => {
    Animated.timing(percentage, {
      toValue: percentageValue,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {symptoms.map(symptom => (
          <View key={symptom} style={styles.questionContainer}>
            <Text style={styles.questionText}>{symptom.replace(/_/g, ' ')}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={answers[symptom] ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={value => handleAnswer(symptom, value)}
              value={answers[symptom] || false}
            />
          </View>
        ))}
      </ScrollView>
      <Button title="Submit Answers" onPress={submitAnswers} />
      {diseaseData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Disease: {diseaseData.disease}</Text>
          <View style={styles.progressBar}>
            <Animated.View
              style={[styles.progressIndicator, { width: percentage.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }) }]}
            />
          </View>
          <Text style={styles.resultText}>Percentage: {diseaseData.percentage}%</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#dad7cd',
  },
  scrollView: {
    paddingBottom: 20,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  questionText: {
    fontSize: 16,
    flex: 1,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressBar: {
    height: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: '#007aff',
  },
});

export default QuestionnairePage;
