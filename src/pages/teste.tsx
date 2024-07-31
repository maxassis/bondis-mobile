import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import KilometerMeterPicker from '../components/distancePicker';

export default function Teste() {
    const [modalVisible, setModalVisible] = useState(false);



    return(
        <SafeAreaView className='flex-1'>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openButton}>
                <Text style={styles.openButtonText}>Abrir Picker</Text>
            </TouchableOpacity>


            <KilometerMeterPicker 
             visible={modalVisible}
             onClose={() => setModalVisible(false)}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    openButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#007BFF',
      borderRadius: 5,
    },
    openButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });



