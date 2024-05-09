import { useEffect, useState, useRef, useMemo } from 'react'
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { requestForegroundPermissionsAsync,
  getCurrentPositionAsync, 
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
 } from 'expo-location';
 import BottomSheet from "@gorhom/bottom-sheet";
 import Bar from "../../assets/Bar.svg"
import { Image } from 'react-native';
import Winner from '../../assets/winner.svg'
import Terceiro from '../../assets/terceira.svg'
import Segundo from '../../assets/segundo.svg'
import Primeiro from '../../assets/primeiro.svg'

export default function Maps() {
  const [location, setLocation] = useState<LocationObject | null>(null)

  const mapRef = useRef<MapView>(null)
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%", "100%"], []);

  async function requestLocationPermissions() {
  
    const { granted } = await requestForegroundPermissionsAsync()

    if(granted) {
     const currentPosition = await getCurrentPositionAsync()
    //  console.log(currentPosition);
     
     setLocation(currentPosition)
    }
  }

  useEffect(() => {
    requestLocationPermissions()
  }, [])

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 0
    }, (response) => {
      setLocation(response)
      mapRef.current?.animateCamera({
        center: response.coords
      })     
    })
  }, [])

  return (
    <View className="flex-1 bg-white justify-center items-center">
       {
        location &&  
        <MapView className='flex-1 w-full'
        ref={mapRef}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        
        >
          <Marker coordinate={location.coords} />
        </MapView>  
      } 

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: "#fff" }}
        >
          <SafeAreaView className='mx-5'>
            <Text className='text-sm font-inter-regular text-bondis-gray-secondary'>Desafio</Text>
            <Text className='text-2xl font-bold font-inter-bold mt-4 mb-4'>Cidade Maravilhosa</Text>
            
            <Bar width={'100%'} className='mx-auto block' />

            <Text className='font-inter-bold text-base mt-2'>5 de 150km</Text>

            <View className='flex-row justify-between mt-6'>
              <View className='h-[88px] w-3/12 border-[0.8px] border-[#D9D9D9] rounded justify-center items-center'>
                <Text className='font-inter-bold text-2xl' >1</Text>
                <Text className='text-[10px] font-inter-regular'>ATIVIDADE</Text>
              </View>
              <View className='h-[88px] w-3/12 border-[0.8px] border-[#D9D9D9] rounded justify-center items-center'>
                <Text className='font-inter-bold text-2xl' >00:46</Text>
                <Text className='text-[10px] font-inter-regular'>TREINO</Text>
              </View>
              <View className='h-[88px] w-3/12 border-[0.8px] border-[#D9D9D9] rounded justify-center items-center'>
                <Text className='font-inter-bold text-2xl' >3,3%</Text>
                <Text className='text-[10px] font-inter-regular'>COMPLETADO</Text>
              </View>
            </View>

            <View className='w-full h-[92px] bg-bondis-black mt-6 rounded p-4 flex-row items-center '>
              <Image source={require("../../assets/top.png")} />
              <Text className='flex-1 flex-wrap ml-[10px] text-center'>
                <Text className='text-bondis-green font-inter-bold'>Nildis</Text>
                <Text numberOfLines={3} className='text-bondis-text-gray font-inter-regular text-justify'>, Mantenha a média de 5km corridos por semana e conclua seu 
                  desafio em apenas 10 semanas!
                </Text>
              </Text>
            </View>

            <Text className="mt-6 font-inter-bold text-lg">Classificação Geral</Text>

            <View className='flex-row justify-between items-end mt-6'>
              <View className='w-[87px] h-[230px] items-center justify-between '>
                <View className='rounded-full justify-center items-center w-[35.76px] h-[35.76px] bg-bondis-text-gray'>
                   <Text className='text-sm font-inter-bold'>3</Text> 
                </View>

                
                
                <View className='w-full h-[140px] relative bg-green-200 justify-end items-center'>
                  <View className='absolute top-[-50px]'>
                  <Terceiro />
                </View>
                <Text numberOfLines={2} className='font-inter-bold text-sm mb-[10px]'>Nildis Silva</Text>
                    <Text className='font-inter-regular text-xs text-[#757575] mb-[10px]'>25:15</Text>
                </View>
              </View>
              <View className='w-[87px] h-[287px] items-center justify-between'>
                  <Winner />
                  <View className='bg-green-400 w-full h-[200px] relative items-center justify-end'>
                    <View className='absolute top-[-50px]'>
                      <Primeiro />
                    </View>
                    <Text numberOfLines={2} className='font-inter-bold text-sm mb-[10px]'>Nildis Silva</Text>
                    <Text className='font-inter-regular text-xs text-[#757575] mb-[10px]'>25:15</Text>
                  </View> 
              </View>
              <View className='w-[87px] h-[260px] items-center justify-between '>
                  <View className='rounded-full mb-2 justify-center items-center w-[35.76px] h-[35.76px] bg-bondis-text-gray'>
                    <Text className='text-sm font-inter-bold'>2</Text>
                  </View>

                  <View className="relative w-full h-[170px] bg-green-300 justify-end items-center">
                    <View className='absolute top-[-50px] '>
                      <Segundo />
                    </View>
                    <Text numberOfLines={2} className='font-inter-bold text-sm mb-[10px]'>Nildis Silva</Text>
                    <Text className='font-inter-regular text-xs text-[#757575] mb-[10px]'>25:15</Text>
                  </View>
              </View>
            </View>



          </SafeAreaView>
        </BottomSheet>
    </View>
  );
}

