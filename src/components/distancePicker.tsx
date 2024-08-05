import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import WheelPicker from 'react-native-wheely';

interface Distance {
  kilometers: number,
  meters: number
}

export interface KilometerMeterPickerModalRef {
  clearDistance: () => void;
  changeDistance: (km: number, m: number) => void;
}

export interface KilometerMeterPickerModalProps {
  visible: boolean;
  onClose: ({ kilometers, meters} : Distance) => void;
}

const KilometerMeterPickerModal = forwardRef<KilometerMeterPickerModalRef, KilometerMeterPickerModalProps>(
  ({ onClose, visible  }, ref) => {
  const [selectedKilometer, setSelectedKilometer] = useState<number>(0);
  const [selectedHundreds, setSelectedHundreds] = useState<number>(0);
  const [selectedTens, setSelectedTens] = useState<number>(0);
  const [selectedUnits, setSelectedUnits] = useState<number>(0);

  const kilometers = [...Array(1000).keys()].map(String);
  const digitOptions = [...Array(10).keys()].map(String);

  useImperativeHandle(ref, () => ({
    clearDistance, changeDistance
  }));

  const getTotalMeters = () => {
    return selectedHundreds * 100 + selectedTens * 10 + selectedUnits;
  };

  function clearDistance() {
    // console.log("clearDistance");
    setSelectedKilometer(0);
    setSelectedHundreds(0);
    setSelectedTens(0);
    setSelectedUnits(0);
  }

  function changeDistance(km: number, mt: number) {
     setSelectedKilometer(km);
     setSelectedHundreds(Math.floor(mt / 100));
     setSelectedTens(Math.floor((mt % 100) / 10));
     setSelectedUnits(mt % 10);
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      // onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-bondis-overlay">
        <View className='w-[350px] bg-white p-5 rounded-[10px] items-center'>
          <Text className='text-lg text-center'>Selecione a distância:</Text>
          <View className='flex-row justify-around items-center w-[95%]'>
            <View className='flex-row items-center'>
              <WheelPicker
                selectedIndex={selectedKilometer}
                options={kilometers}
                onChange={(index) => setSelectedKilometer(index)}
                containerStyle={{ width: 60 }}
              />
              <Text className='font-inter-bold ml-[5px]'>Km</Text>
            </View>            
            <View className='flex-row items-center gap-[5px]'>
              <View>
                <WheelPicker
                  selectedIndex={selectedHundreds}
                  options={digitOptions}
                  onChange={(index) => setSelectedHundreds(index)}
                  containerStyle={{ width: 40 }}
                />
              </View>
              <View>
                <WheelPicker
                  selectedIndex={selectedTens}
                  options={digitOptions}
                  onChange={(index) => setSelectedTens(index)}
                  containerStyle={{ width: 40 }}
                />
              </View>
              <View>
                <WheelPicker
                  selectedIndex={selectedUnits}
                  options={digitOptions}
                  onChange={(index) => setSelectedUnits(index)}
                  containerStyle={{ width: 40 }}
                />
              </View>
              <Text className='font-inter-bold'>Mt</Text>
            </View>
          </View>
          <View className='mt-5 items-center'>
            <Text className='text-lg items-center font-inter-bold'>
              Total: {selectedKilometer} km {getTotalMeters()} m
            </Text>
          </View>
          <TouchableOpacity onPress={() => onClose({ kilometers: selectedKilometer, meters: getTotalMeters() })} className='mt-5 py-[10px] px-5 rounded-[5px] bg-bondis-green'>
            <Text className='font-inter-bold text-black'>Selecionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
)

export default KilometerMeterPickerModal;
