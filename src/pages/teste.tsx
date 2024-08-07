import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { ptBR } from '../utils/localeCalendar'; 

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

const Teste = () => {
  const [day, setDay] = useState<DateData>({} as DateData);


  return (
    <View className='flex-1 bg-black'>

      <View className='my-auto'>
        <Calendar
        className="rounded-lg mx-3"
        theme={{
          todayTextColor: '#EB4335',
          selectedDayTextColor: 'black',
          selectedDayBackgroundColor: '#12FF55',
          arrowColor: '#12FF55',
          textMonthFontWeight: 'bold',
        }}
        onDayPress={setDay}
        markedDates={{ [day.dateString]: { selected: true } }}
        />
      </View>
     
    </View>
  );
};



export default Teste;




// import React, { useState } from 'react';
// import { Modal, View, Text, Button, StyleSheet } from 'react-native';

// const App = () => {
//   const [modalVisible, setModalVisible] = useState(false);

//   return (
//     <View style={styles.container}>
//       <Button title="Mostrar Modal" onPress={() => setModalVisible(true)} />
      
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(false);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Hello World!</Text>
//             <Button
//               title="Fechar Modal"
//               onPress={() => setModalVisible(false)}
//             />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });

// export default App;