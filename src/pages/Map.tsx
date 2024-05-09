import { useEffect, useState, useRef, useMemo } from 'react'
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { requestForegroundPermissionsAsync,
  getCurrentPositionAsync, 
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
 } from 'expo-location';
 import BottomSheet from "@gorhom/bottom-sheet";

export default function Maps() {
  const [location, setLocation] = useState<LocationObject | null>(null)

  const mapRef = useRef<MapView>(null)
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "100%"], []);

  async function requestLocationPermissions() {
  
    const { granted } = await requestForegroundPermissionsAsync()

    if(granted) {
     const currentPosition = await getCurrentPositionAsync()
     console.log(currentPosition);
     
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
          <View>
            <Text>oi</Text>
          </View>
        </BottomSheet>
    </View>
  );
}

