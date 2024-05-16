import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCKMFf7JiC0NMvDGTjfDz0I2mc_K_qeLgw",
  authDomain: "chat-168c0.firebaseapp.com",
  projectId: "chat-168c0",
  storageBucket: "chat-168c0.appspot.com",
  messagingSenderId: "564180466557",
  appId: "1:564180466557:android:70defa73542d2fb053aa14"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
