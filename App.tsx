import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { Text, Platform } from 'react-native';
import Maps from './src/pages/Map';
import Profile from './src/pages/Profile';
import Login from './src/pages/Login'
import { StatusBar } from 'expo-status-bar';
import { Inter_700Bold, Inter_400Regular, useFonts } from '@expo-google-fonts/inter'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Intro from './src/pages/Intro';
import Routes from "./src/routes";
import tokenExists from "./src/store/auth";

export default function App() {
  const authStore = tokenExists((state) => state.setToken);

  useEffect(() => {
    async function getToken() {
      const storagedToken = await AsyncStorage.getItem("@Bondis:token");
      if(storagedToken) authStore(storagedToken);   
    }
    getToken();
  }, []);

  let [fontsLoaded, fontError] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
    <GestureHandlerRootView className="flex-1">
      {/* <Maps /> */}
      {/* <Profile /> */}
      {/* <Login /> */}
      {/* <Intro /> */}
      <Routes />
      <StatusBar style={Platform.OS === "ios" ? "dark" : "light"} translucent={false} backgroundColor="#000"/>    
    </GestureHandlerRootView>
    </NavigationContainer>
 
  );
}
