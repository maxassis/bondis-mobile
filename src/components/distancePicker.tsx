import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WheelPicker from 'react-native-wheely';


const KilometerMeterPicker: React.FC = () => {
  const [selectedKilometer, setSelectedKilometer] = useState<number>(0);
  const [selectedHundreds, setSelectedHundreds] = useState<number>(0);
  const [selectedTens, setSelectedTens] = useState<number>(0);
  const [selectedUnits, setSelectedUnits] = useState<number>(0);

  const kilometers = [...Array(1000).keys()].map(String);
  const digitOptions = [...Array(10).keys()].map(String);

  const getTotalMeters = () => {
    return selectedHundreds * 100 + selectedTens * 10 + selectedUnits;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione a distância:</Text>
      <View className='flex-row w-[335px] mx-auto justify-between px-[55px]'>
        <Text className='font-inter-bold'>Quilometros</Text>
        <Text className='font-inter-bold'>Metros</Text>
      </View>
      <View style={styles.pickerContainer}>
        <View style={styles.pickerWrapper}>
          {/* <Text style={styles.pickerLabel}>Quilômetros</Text> */}
          <WheelPicker
            selectedIndex={selectedKilometer}
            options={kilometers}
            onChange={(index) => setSelectedKilometer(index)}
            containerStyle={{ width: 60 }}
          />
        </View>

        <View className='flex-row w-[130px] justify-between items-center '>

        <View style={styles.pickerWrapper}>
          {/* <Text style={styles.pickerLabel}>Centenas</Text> */}
          <WheelPicker
            selectedIndex={selectedHundreds}
            options={digitOptions}
            onChange={(index) => setSelectedHundreds(index)}
            // style={styles.picker}
            containerStyle={{ width: 40, }}
          />
        </View>
        <View style={styles.pickerWrapper}>
          {/* <Text style={styles.pickerLabel}>Dezenas</Text> */}
          <WheelPicker
            selectedIndex={selectedTens}
            options={digitOptions}
            onChange={(index) => setSelectedTens(index)}
            // itemStyle={{ backgroundColor: 'red' }}
            containerStyle={{ width: 40 }}
          />
        </View>
        <View style={styles.pickerWrapper}>
          {/* <Text style={styles.pickerLabel}>Unidades</Text> */}
          <WheelPicker
            selectedIndex={selectedUnits}
            options={digitOptions}
            onChange={(index) => setSelectedUnits(index)}
            // style={styles.picker}
            containerStyle={{ width: 40 }}
          />
        </View>

        </View>

      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          Total: {selectedKilometer} km {getTotalMeters()} m
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    width: 335,
    marginHorizontal: 'auto',
    // justifyContent: 'space-between',
    // backgroundColor: 'black',
  },
  pickerWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: 10,
  },
  pickerLabel: {
    marginBottom: 10,
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default KilometerMeterPicker;
