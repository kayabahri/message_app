import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';


const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const currentUser = auth.currentUser; // Kullanıcı bilgisi

  useEffect(() => {
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

    return unsubscribe; // Cleanup function
  }, [route.params.id]);

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
