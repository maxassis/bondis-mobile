import { useEffect, useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { requestForegroundPermissionsAsync,
  getCurrentPositionAsync, 
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
 } from 'expo-location';

export default function App() {
  const [location, setLocation] = useState<LocationObject | null>(null)

  const mapRef = useRef<MapView>(null)

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
    <View style={styles.container}>
      {
        location &&  
        <MapView style={styles.map}
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
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  }
});
