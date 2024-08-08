// import { useState } from 'react';
// import { View, Modal } from 'react-native';
// import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
// import { ptBR } from '../utils/localeCalendar'; 

// LocaleConfig.locales['pt-br'] = ptBR;
// LocaleConfig.defaultLocale = 'pt-br';

// const Teste = () => {
//   const [day, setDay] = useState<DateData>({} as DateData);


//   return (
//     <View className='flex-1 bg-black'>

//       <View className='my-auto'>
//         <Calendar
//         className="rounded-lg mx-3"
//         theme={{
//           todayTextColor: '#EB4335',
//           selectedDayTextColor: 'black',
//           selectedDayBackgroundColor: '#12FF55',
//           arrowColor: '#12FF55',
//           textMonthFontWeight: 'bold',
//         }}
//         onDayPress={setDay}
//         markedDates={{ [day.dateString]: { selected: true } }}
//         />
//       </View>
     
//     </View>
//   );
// };


// export default Teste;

// import React, { useState } from 'react';
// import { View, Modal, TouchableOpacity, Text, Pressable } from 'react-native';
// import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
// import { ptBR } from '../utils/localeCalendar'; 

// LocaleConfig.locales['pt-br'] = ptBR;
// LocaleConfig.defaultLocale = 'pt-br';

// const Teste = () => {
//   const [day, setDay] = useState<DateData>({} as DateData);
//   const [modalVisible, setModalVisible] = useState(false);

//   return (
//     <>
//       <TouchableOpacity onPress={() => setModalVisible(true)} className="bg-green-500 p-4 rounded-lg">
//         <Text className="text-white font-bold">Abrir Calendário</Text>
//       </TouchableOpacity>

//       <Modal
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)} // Para fechar o modal ao pressionar o botão "voltar" no Android
//       >
//         <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
//           <View className='flex-1 justify-center items-center bg-black/50'>
//             <Pressable>
//               <View className='bg-white p-6 rounded-lg shadow-lg w-80'>
                
//                 {/* Calendário */}
//                 <Calendar
//                   className="rounded-lg"
//                   theme={{
//                     todayTextColor: '#EB4335',
//                     selectedDayTextColor: 'black',
//                     selectedDayBackgroundColor: '#12FF55',
//                     arrowColor: '#12FF55',
//                     textMonthFontWeight: 'bold',
//                   }}
//                   onDayPress={setDay}
//                   markedDates={{ [day.dateString]: { selected: true } }}
//                 />

//               </View>
//             </Pressable>
//           </View>
//         </Pressable>
//       </Modal>
//     </>
//   );
// };

// export default Teste;

import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, Pressable, Picker, Platform } from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { ptBR } from '../utils/localeCalendar'; 

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

const Teste = () => {
  const [day, setDay] = useState<DateData>({} as DateData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i); // Últimos 100 anos

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} className="bg-green-500 p-4 rounded-lg">
        <Text className="text-white font-bold">Abrir Calendário</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
          <View className='flex-1 justify-center items-center bg-black/50'>
            <Pressable>
              <View className='bg-white p-6 rounded-lg shadow-lg w-80'>
                
                {/* Seletor de Ano */}
                <Picker
                  selectedValue={selectedYear}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue) => setSelectedYear(itemValue as number)}
                >
                  {years.map(year => (
                    <Picker.Item key={year} label={`${year}`} value={year} />
                  ))}
                </Picker>

                {/* Calendário */}
                <Calendar
                  current={`${selectedYear}-01-01`}
                  className="rounded-lg"
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
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default Teste;