import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import ContactRow from "../components/Contacts";
import { auth, firestore } from '../firebaseConfig';
import { collection, onSnapshot, addDoc, query, where } from 'firebase/firestore';
import { Ionicons } from "@expo/vector-icons";
import EmailPromptModal from './Modals';

const Chats = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      const chatsQuery = query(
        collection(firestore, "chats"),
        where("users", "array-contains", auth.currentUser.email)
      );

      const unsubscribe = onSnapshot(chatsQuery, snapshot => {
        const loadedChats = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            lastMessage: data.messages.length > 0 ? data.messages[data.messages.length - 1] : "No messages yet.",
            users: data.users,
          };
        });
        setChats(loadedChats);
      });

      return () => unsubscribe(); 
    } else {
      navigation.navigate("SignUp");
    }
  }, [auth.currentUser]);

  const handleFABPress = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleEmailSubmit = async (email) => {
    try {
      const chatRef = collection(firestore, "chats");
      const docRef = await addDoc(chatRef, {
        users: [auth.currentUser.email, email],
        messages: [],
      });

      navigation.navigate("Chat", { id: docRef.id });
    } catch (error) {
      console.error("Error creating chat: ", error);
      Alert.alert("Error", "An error occurred while creating the chat.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {chats.map(chat => (
        <ContactRow
          key={chat.id}
          name={chat.users.find(u => u !== auth.currentUser.email)}
          subtitle={chat.lastMessage.text || "No messages yet."}
          onPress={() => navigation.navigate("Chat", { id: chat.id })}
        />
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleFABPress}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
      <EmailPromptModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onSubmit={handleEmailSubmit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'red',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chats;
