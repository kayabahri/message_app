import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Chats from "./screens/Chats";
import Settings from "./screens/Settings";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Chat from "./screens/Chat";
import "./firebaseConfig";

const Tabs = createBottomTabNavigator();

const ChatsStack = createStackNavigator();
const ChatsScreen = () => (
  <ChatsStack.Navigator>
    <ChatsStack.Screen name="ChatsTab" component={Chats} options={{ headerShown: false }} />
    <ChatsStack.Screen name="Chat" component={Chat} />
  </ChatsStack.Navigator>
);

const SettingsStack = createStackNavigator();
const SettingsScreen = () => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen name="SettingsScreen" component={Settings} />
  </SettingsStack.Navigator>
);

const TabScreen = () => (
  <Tabs.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === 'Chats') {
        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
      } else if (route.name === 'Settings') {
        iconName = focused ? 'settings' : 'settings-outline';
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    }
  })}>
    <Tabs.Screen name="Chats" component={ChatsScreen} options={{ headerTitleAlign: 'center' }} />
    <Tabs.Screen name="Settings" component={SettingsScreen} options={{ headerTitleAlign: 'center' }} />
  </Tabs.Navigator>
);

const MainStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false, presentation: 'card' }}>
        <MainStack.Screen name="Tabs" component={TabScreen} />
        <MainStack.Screen name="SignUp" component={SignUp} />
        <MainStack.Screen name="SignIn" component={SignIn} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
