import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import Button from "../components/Button";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebaseConfig";

const SignUp = () => {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const createAccount = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        navigation.navigate('SignIn');
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Create New Account</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput 
          style={styles.input} 
          placeholder="Enter your name" 
          value={name} 
          onChangeText={text => setName(text)} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Enter your email" 
          value={email} 
          onChangeText={text => setEmail(text)} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Enter your password" 
          value={password} 
          onChangeText={text => setPassword(text)} 
          secureTextEntry={true} 
        />
        <View style={styles.buttonsContainer}>
          <Button title="Sign In" variant="secondary" onPress={() => navigation.navigate('SignIn')}/>
          <Button title="Sign Up" variant="primary" onPress={createAccount} loading={isLoading} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    marginTop: 30,
    marginBottom: 16,
    fontSize: 36,
    fontWeight: "800",
  },
  contentContainer: {
    padding: 42,
  },
  input: {
    backgroundColor: "white",
    fontSize: 13,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 6,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  }
});

export default SignUp;
