import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { firestore, auth } from '../firebaseConfig'; 
import { onAuthStateChanged } from 'firebase/auth';

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // currentUser durumunu useState ile yönet

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, user => {
      setCurrentUser(user); // Kullanıcı durumu değiştiğinde currentUser'ı güncelle
    });

    return unsubscribeAuth; // Cleanup function for auth state change
  }, []);

  useEffect(() => {
    if (currentUser) {
      const chatDocRef = doc(firestore, 'chats', route.params.id);
      const unsubscribe = onSnapshot(chatDocRef, docSnapshot => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setMessages(
            data.messages.map(m => ({
              ...m,
              createdAt: m.createdAt.toDate(),
            }))
          );
        }
      });

      return unsubscribe; // Cleanup function for chat snapshot
    }
  }, [route.params.id, currentUser]);

  const onSend = useCallback(
    async (m = []) => {
      if (route.params.id && currentUser) {
        const chatDocRef = doc(firestore, 'chats', route.params.id);
        await updateDoc(chatDocRef, {
          messages: arrayUnion(
            ...m.map(message => ({
              ...message,
              createdAt: new Date(),
              user: {
                _id: currentUser.uid,
                name: currentUser.email,
              },
            }))
          ),
        });
      }
    },
    [route.params.id, currentUser]
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: currentUser?.uid, // Kullanıcı ID'si
      }}
    />
  );
};

export default Chat;
