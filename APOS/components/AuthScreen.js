import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MultiSelect } from 'react-native-element-dropdown';

const { width, height } = Dimensions.get('window');

const AuthScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [interests, setInterests] = useState('');
  const [nameWarning, setNameWarning] = useState(false);
  const [dobWarning, setDobWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);
  const [cityWarning, setCityWarning] = useState(false);
  const [occupationWarning, setOccupationWarning] = useState(false);
  const [interestsWarning, setInterestsWarning] = useState(false);

  const data = [
    { label: 'Software Development' },
    { label: 'Data Science' },
    { label: 'Machine Learning' },
    { label: 'Artificial Intelligence' },
    { label: 'Web Development' },
    { label: 'Mobile Development' },
    { label: 'Cybersecurity' },
    { label: 'Network Engineering' },
    { label: 'Cloud Computing' },
    { label: 'DevOps' },
    { label: 'Database Administration' },
    { label: 'UI/UX Design' },
    { label: 'Game Development' },
    { label: 'Embedded Systems' },
    { label: 'Robotics' },
    { label: 'Virtual Reality/Augmented Reality' },
    { label: 'Internet of Things (IoT)' },
    { label: 'Big Data Analytics' },
    { label: 'Blockchain Technology' },
    { label: 'Bioinformatics' }
];

  const handleSignup = () => {
    // Validate input fields
    if (!name) {
      setNameWarning(true);
      return;
    }
    if (!dob) {
      setDobWarning(true);
      return;
    }
    if (!email || !validateEmail(email)) {
      setEmailWarning(true);
      return;
    }
    if (!city) {
      setCityWarning(true);
      return;
    }
    if (!occupation) {
      setOccupationWarning(true);
      return;
    }
    if (!interests) {
      setInterestsWarning(true);
      return;
    }

    // All fields are filled, continue with signup logic
    console.log('Signing up with:', name, dob, email, city, occupation, interests);
    // Navigate to the login page after signing up
    navigation.navigate('WelcomePage');
  };

  const formatDob = (text) => {
    // Automatically add slashes between day, month, and year
    let formattedText = text.replace(/\D/g, '');
    if (formattedText.length > 4) {
      formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}/${formattedText.slice(4, 8)}`;
    } else if (formattedText.length > 2) {
      formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}`;
    }
    return formattedText;
  };

  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>WELCOME!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => {
            setName(text);
            setNameWarning(false); // Clear warning when user starts typing
          }}
          value={name}
          autoCapitalize="words"
          placeholderTextColor="#999"
        />
        {nameWarning && <Text style={styles.warning}>Name is required</Text>}
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (DD/MM/YYYY)"
          onChangeText={(text) => {
            const formattedText = formatDob(text);
            setDob(formattedText);
            setDobWarning(false); // Clear warning when user starts typing
          }}
          value={dob}
          keyboardType="numeric"
          maxLength={10}
          placeholderTextColor="#999"
        />
        {dobWarning && <Text style={styles.warning}>Date of Birth is required</Text>}
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
            setEmailWarning(false); // Clear warning when user starts typing
          }}
          value={email}
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        {emailWarning && <Text style={styles.warning}>Enter a valid email address</Text>}
        <TextInput
          style={styles.input}
          placeholder="City"
          onChangeText={(text) => {
            setCity(text);
            setCityWarning(false); // Clear warning when user starts typing
          }}
          value={city}
          autoCapitalize="words"
          placeholderTextColor="#999"
        />
        {cityWarning && <Text style={styles.warning}>City is required</Text>}
        
        <TextInput
          style={styles.input}
          placeholder="Occupation"
          onChangeText={(text) => {
            setOccupation(text);
            setOccupationWarning(false); // Clear warning when user starts typing
          }}
          value={occupation}
          autoCapitalize="words"
          placeholderTextColor="#999"
        />
        {occupationWarning && (
          <Text style={styles.warning}>Occupation is required</Text>
        )}


        <MultiSelect
        style={styles.input}
        data={data}
        labelField="label"
        valueField="label"
        placeholder="Select your Intrest Area"
        value={interests}
        onChange={(item) => { setInterests(item); setInterestsWarning(false);}}
        placeholderStyle={{color: 'grey', fontSize: 14.5}}
        containerStyle={{backgroundColor: '#333', borderColor: '#333', borderRadius: 10}}
        itemTextStyle={{color: 'grey'}}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Interests"
          onChangeText={(text) => {
            setInterests(text);
            setInterestsWarning(false); // Clear warning when user starts typing
          }}
          value={interests}
          autoCapitalize="words"
          placeholderTextColor="#999"
        /> */}

        {interestsWarning && (
          <Text style={styles.warning}>Interests are required</Text>
        )}
       
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.1,
  },
  title: {
    fontSize: width * 0.1,
    color: '#fff',
    marginBottom: height * 0.05,
  },
  inputContainer: {
    width: '100%',
    marginBottom: height * 0.03,
  },
  input: {
    width: '100%',
    height: height * 0.06,
    backgroundColor: '#333',
    borderRadius: 8,
    color: '#fff',
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
  },
  button: {
    width: '100%',
    height: height * 0.06,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  buttonText: {
    fontSize: width * 0.05,
    color: '#000000',
    fontWeight: 'bold',
  },
  warning: {
    color: 'red',
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
});

export default AuthScreen;
