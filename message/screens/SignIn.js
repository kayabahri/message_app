import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/core";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const signIn = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError('');

    try {
      const authResult = await signInWithEmailAndPassword(auth, email, password);
      if (authResult) {
        navigation.navigate('Chats');
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Sign In</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput 
          style={styles.input} 
          placeholder="E-mail adresini giriniz" 
          value={email} 
          onChangeText={text => setEmail(text)} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Şifrenizi giriniz" 
          value={password} 
          onChangeText={text => setPassword(text)} 
          secureTextEntry={true} 
        />
        <View style={styles.buttonsContainer}>
           <Button title="Sign Up" variant="secondary" onPress={() => navigation.navigate('SignUp')} loading={isLoading} />
           <Button title="Sign In" variant="primary" onPress={signIn} loading={isLoading}/>
        </View>
      </View>
    </SafeAreaView>
  );
};


});

export default SignIn;
