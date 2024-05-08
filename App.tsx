import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Maps from './src/pages/Map';
import Profile from './src/pages/Profile';
import { StatusBar } from 'expo-status-bar';
import { Inter_700Bold, Inter_400Regular, useFonts } from '@expo-google-fonts/inter'


export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return <Text>Loading...</Text>;
  }


  return (
    <SafeAreaView className='flex-1'>
      {/* <Maps /> */}
      <Profile />
      <StatusBar style="light" translucent={false}  />
    </SafeAreaView>
 
  );
}
