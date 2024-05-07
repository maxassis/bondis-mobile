import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Maps from './src/pages/Map';
import Profile from './src/pages/Profile';
import { StatusBar } from 'expo-status-bar';


export default function App() {

  return (
    <SafeAreaView className='flex-1'>
      <Maps />
      {/* <Profile /> */}
      <StatusBar style="light" translucent={false}  />
    </SafeAreaView>
 
  );
}
