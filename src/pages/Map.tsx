import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import { decode } from "@mapbox/polyline";
import { Polyline } from "react-native-maps";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import Bar from "../../assets/Bar.svg";
import Left from "../../assets/arrow-left.svg";
import { Image } from "react-native";
import Winner from "../../assets/winner.svg";
import Terceiro from "../../assets/terceira.svg";
import Segundo from "../../assets/segundo.svg";
import Primeiro from "../../assets/primeiro.svg";
import UserTime from "../components/userTime";
import { markers } from "../markers";

const tokyoRegion = {
  latitude: 35.6762,
  longitude: 139.6503,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
const chibaRegion = {
  latitude: 35.6074,
  longitude: 140.1065,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const getDirections = async (startLoc: any, destinationLoc: any) => {
  try {
    const KEY = process.env.EXPO_PUBLIC_GOOGLE_API; //put your API key here.
    //otherwise, you'll have an 'unauthorized' error.
    let resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
    );
    let respJson = await resp.json();
    let points = decode(respJson.routes[0].overview_polyline.points);
    console.log(points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1]
      };
    });
    return coords;
  } catch (error) {
    return error;
  }
};


export default function Map() {
  const [coords, setCoords] = useState<any>([]);
  const navigation = useNavigation<any>();

  const [location, setLocation] = useState<LocationObject | null>(null);

  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%", "85%", "100%"], []);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      //  console.log(currentPosition);

      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 0,
      },
      (response) => {
        setLocation(response);
        mapRef.current?.animateCamera({
          center: response.coords,
        });
      }
    );
  }, []);

  useEffect(() => {
    //fetch the coordinates and then store its value into the coords Hook.
    getDirections("-22.8846,-42.0066", "-22.8176,-42.0845")
      .then(coords => setCoords(coords))
      .catch(err => console.log("Something went wrong"));
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center relative">
      {location && (
        <MapView
          className="flex-1 w-full"
          // ref={mapRef}
          provider={PROVIDER_GOOGLE}
          // showsUserLocation
          showsMyLocationButton
          // onRegionChangeComplete={(r) => console.log(r)}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          // initialRegion={tokyoRegion}
         >

          {/* {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.name}
            >
                <View className="w-[55px] h-[55px] rounded-full bg-bondis-green justify-center items-center">
                    <Image source={{ uri: marker.image }} className="w-[47px] h-[47px] rounded-full" />
                </View>
            </Marker>  
          ))} */}
        {/* 
          <Polyline
            coordinates={[
              { latitude: -22.8846, longitude: -42.0066 },
              { latitude: -22.8176, longitude: -42.0845 },
            ]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={2} 
          /> */}
          {coords.length > 0 && <Polyline coordinates={coords} strokeWidth={3} />}





          <Marker coordinate={
            {
              latitude: -22.8846,
              longitude: -42.0066
            }
          } 
          >
            <View className="w-[55px] h-[55px] rounded-full bg-bondis-green justify-center items-center">
                    <Image source={{ uri: "https://iijythvtsrfruihwseua.supabase.co/storage/v1/object/public/Meu%20desafio/file3.png" }} className="w-[47px] h-[47px] rounded-full" />
            </View>
          </Marker>  
        </MapView>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        className="absolute top-[38px] left-[13px] h-[43px] 
      w-[43px] rounded-full bg-bondis-text-gray justify-center items-center"
      >
        <Left />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backgroundStyle={{ 
          backgroundColor: "#fff",
          borderRadius: 20
        }}
        index={-1}
      >
        <BottomSheetScrollView>
          <SafeAreaView className="mx-5">
            <Text className="text-sm font-inter-regular text-bondis-gray-secondary">
              Desafio
            </Text>
            <Text className="text-2xl font-bold font-inter-bold mt-4 mb-4">
              Cidade Maravilhosa
            </Text>

            <Bar width={"100%"} className="mx-auto block" />

            <Text className="font-inter-bold text-base mt-2">5 de 150km</Text>

            <View className="flex-row justify-between mt-6">
              <View className="h-[88px] w-3/12 border-[0.8px] border-[#D9D9D9] rounded justify-center items-center">
                <Text className="font-inter-bold text-2xl">1</Text>
                <Text className="text-[10px] font-inter-regular">
                  ATIVIDADE
                </Text>
              </View>
              <View className="h-[88px] w-3/12 border-[0.8px] border-[#D9D9D9] rounded justify-center items-center">
                <Text className="font-inter-bold text-2xl">00:46</Text>
                <Text className="text-[10px] font-inter-regular">TREINO</Text>
              </View>
              <View className="h-[88px] w-3/12 border-[0.8px] border-[#D9D9D9] rounded justify-center items-center">
                <Text className="font-inter-bold text-2xl">3,3%</Text>
                <Text className="text-[10px] font-inter-regular">
                  COMPLETADO
                </Text>
              </View>
            </View>

            <View className="w-full h-[92px] bg-bondis-black mt-6 rounded p-4 flex-row items-center ">
              <Image source={require("../../assets/top.png")} />
              <Text className="flex-1 flex-wrap ml-[10px] text-center">
                <Text className="text-bondis-green font-inter-bold">
                  Nildis
                </Text>
                <Text
                  numberOfLines={3}
                  className="text-bondis-text-gray font-inter-regular text-justify"
                >
                  , Mantenha a média de 5km corridos por semana e conclua seu
                  desafio em apenas 10 semanas!
                </Text>
              </Text>
            </View>

            <Text className="mt-6 font-inter-bold text-lg">
              Classificação Geral
            </Text>

            <View className="flex-row justify-between items-end mt-6">
              <View className="w-[87px] h-[230px] items-center justify-between ">
                <View className="rounded-full justify-center items-center w-[35.76px] h-[35.76px] bg-bondis-text-gray">
                  <Text className="text-sm font-inter-bold">3</Text>
                </View>

                <LinearGradient
                  colors={["#12FF55", "white"]}
                  className="w-full h-[140px] relative justify-end items-center"
                >
                  <View className="absolute top-[-50px]">
                    <Terceiro />
                  </View>
                  <Text
                    numberOfLines={2}
                    className="font-inter-bold text-sm mb-[10px]"
                  >
                    Nildis Silva
                  </Text>
                  <Text className="font-inter-regular text-xs text-[#757575] mb-[10px]">
                    25:15
                  </Text>
                </LinearGradient>
              </View>
              <View className="w-[87px] h-[287px] items-center justify-between">
                <Winner />
                <LinearGradient colors={["#12FF55", "white"]} className="w-full h-[200px] relative items-center justify-end">
                  <View className="absolute top-[-50px]">
                    <Primeiro />
                  </View>
                  <Text
                    numberOfLines={2}
                    className="font-inter-bold text-sm mb-[10px]"
                  >
                    Nildis Silva
                  </Text>
                  <Text className="font-inter-regular text-xs text-[#757575] mb-[10px]">
                    25:15
                  </Text>
                </LinearGradient>
              </View>
              <View className="w-[87px] h-[260px] items-center justify-between ">
                <View className="rounded-full mb-2 justify-center items-center w-[35.76px] h-[35.76px] bg-bondis-text-gray">
                  <Text className="text-sm font-inter-bold">2</Text>
                </View>

                <LinearGradient colors={["#12FF55", "white"]} className="relative w-full h-[170px] justify-end items-center">
                  <View className="absolute top-[-50px] ">
                    <Segundo />
                  </View>
                  <Text
                    numberOfLines={2}
                    className="font-inter-bold text-sm mb-[10px]"
                  >
                    Nildis Silva
                  </Text>
                  <Text className="font-inter-regular text-xs text-[#757575] mb-[10px]">
                    25:15
                  </Text>
                </LinearGradient>
              </View>
            </View>

            <View className="w-full mt-8">
              <UserTime />
              <UserTime />
              <UserTime />
              <UserTime />
              <UserTime />
            </View>
          </SafeAreaView>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}
