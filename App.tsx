import { Text } from 'react-native';
import Maps from './src/pages/Map';
import Profile from './src/pages/Profile';
import Login from './src/pages/Login'
import { StatusBar } from 'expo-status-bar';
import { Inter_700Bold, Inter_400Regular, useFonts } from '@expo-google-fonts/inter'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Intro from './src/pages/Intro';

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return <Text>Loading...</Text>;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      {/* <Maps /> */}
      {/* <Profile /> */}
      {/* <Login /> */}
      <Intro />
      <StatusBar style="light" translucent={false}  />
    
    </GestureHandlerRootView>
 
  );
}
