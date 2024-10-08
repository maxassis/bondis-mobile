import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Callout, Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
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
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import Left from "../../assets/arrow-left.svg";
import { Image } from "react-native";
import Winner from "../../assets/winner.svg";
import Terceiro from "../../assets/terceira.svg";
import Segundo from "../../assets/segundo.svg";
import Primeiro from "../../assets/primeiro.svg";
import UserTime from "../components/userTime";
import tokenExists from '../store/auth';
import * as Progress from 'react-native-progress';
import userDataStore from "../store/userData";
import { mapStyle } from "../mapStyle";
import { cva } from "class-variance-authority";

const userPin = cva(
  "h-[50px] w-[50px] rounded-full bg-black justify-center items-center",
  {
    variants: {
      intent: {
        user: "bg-bondis-green h-[58px] w-[58px] ",
      },
    },
  }
);

const photoUser = cva(
  "h-[42px] w-[42px] rounded-full",
  {
    variants: {
      intent: {
        user: "h-[50px] w-[50px]",
      },
    },
  }
);

export interface DesafioType {
  id:            number;
  name:          string;
  description:   string;
  location:      Array<number[]>;
  participation: Participation[];
}

export interface Participation {
  user: User;
  progress: number;
}

export interface User {
  id:       string;
  name:     string;
  UserData: UserData | null;
}

export interface UserData {
  avatar_url: string;
}

export interface UserParticipation {
  avatar: string
  location: Location
  name: string
  userId: string
  distance: number,
  percentage: string
}

export interface Location {
  latitude: number
  longitude: number
}

const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const findPointAtDistance = (coordinates: number[][], distance: number) => {
  let traveled = 0;
  for (let i = 0; i < coordinates.length - 1; i++) {
    const [startLat, startLon] = coordinates[i];
    const [endLat, endLon] = coordinates[i + 1];
    const segmentDistance = haversine(startLat, startLon, endLat, endLon);
    if (traveled + segmentDistance >= distance) {
      const remainingDistance = distance - traveled;
      const ratio = remainingDistance / segmentDistance;
      const newLat = startLat + (endLat - startLat) * ratio;
      const newLon = startLon + (endLon - startLon) * ratio;
      // return [newLat, newLon];
      return { latitude: newLat, longitude: newLon };
    }
    traveled += segmentDistance;
  }
  return coordinates[coordinates.length - 1];
};

const calculateTotalDistance = (coordinates: number[][]): number => {
  let totalDistance = 0;

  for (let i = 0; i < coordinates.length - 1; i++) {
    const [startLat, startLon] = coordinates[i];
    const [endLat, endLon] = coordinates[i + 1];
    totalDistance += haversine(startLat, startLon, endLat, endLon);
  }

  return totalDistance;
};

const calculateUserDistance = (coordinates: number[][], progress: number): number => {
  return progress;
};

const formatPercentage = (progress: number): string => {
  return progress.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    // minimumFractionDigits: 2,
     maximumFractionDigits: 1
  });
};

export default function Map() {
  const navigation = useNavigation<any>();
  const token = tokenExists((state) => state.token)
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [desafio, setDesafio] = useState<DesafioType>({} as DesafioType) ;
  const [usersParticipants, setUsersParticipants] = useState<any>([]);
  const [userProgress, setUserProgress] = useState<any>(0);
  const [userDistance, setUserDistance] = useState<number>(0);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [userLocation, setUserLocation] = useState<any>([]);
  const getUserData = userDataStore((state) => state.data);
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%", "85%", "100%"], []);

  const getUserPath = () => {
    if (!desafio || userDistance === 0) return [];

    const path = [];
    let traveled = 0;

    for (let i = 0; i < desafio.location.length - 1; i++) {
      const [startLat, startLon] = desafio.location[i];
      const [endLat, endLon] = desafio.location[i + 1];
      const segmentDistance = haversine(startLat, startLon, endLat, endLon);

      if (traveled + segmentDistance >= userDistance) {
        const remainingDistance = userDistance - traveled;
        const ratio = remainingDistance / segmentDistance;
        const newLat = startLat + (endLat - startLat) * ratio;
        const newLon = startLon + (endLon - startLon) * ratio;

        path.push({ latitude: startLat, longitude: startLon });
        path.push({ latitude: newLat, longitude: newLon });
        break;
      } else {
        path.push({ latitude: startLat, longitude: startLon });
        traveled += segmentDistance;
      }
    }

    return path;
  };

  // async function requestLocationPermissions() {
  //   const { granted } = await requestForegroundPermissionsAsync();

  //   if (granted) {
  //     const currentPosition = await getCurrentPositionAsync();

  //     setLocation(currentPosition);
  //   }
  // }

  // useEffect(() => {
  //   requestLocationPermissions();
  // }, []);

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
    fetch("http://172.22.0.1:3000/desafio/getdesafio/24", {
      headers: {
        "Content-type": "application/json",
        authorization:
            "Bearer " + token
      },
    })
    .then((response) => response.json() as Promise<DesafioType>)
    .then((data) => {
      setDesafio(data);
      
      const totalDistance = calculateTotalDistance(data.location);
      const updatedParticipants = data.participation.map(dta => {
        const userLocation = findPointAtDistance(data.location, dta.progress);
        const userDistance = calculateUserDistance(data.location, dta.progress);
        const progressPercentage = formatPercentage((userDistance / totalDistance) * 100);

        setTotalDistance(totalDistance);

        if(dta.user.id === getUserData?.usersId) {
          setUserProgress(Number(progressPercentage) / 100)
          setUserDistance(dta.progress);
          setUserLocation(userLocation);
        }

        return {
          userId: dta.user.id,
          name: dta.user.name,
          avatar: dta.user.UserData?.avatar_url,
          location: userLocation,
          distance: userDistance,
          percentage: progressPercentage,
        };
      });
 
      setUsersParticipants(updatedParticipants); 
    })
    .catch(error => console.error("Error fetching desafio:", error));
  }, []);


  return (
    <View className="flex-1 bg-white justify-center items-center relative">
      {location && (
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          className="flex-1 w-full"
          // ref={mapRef}
          initialRegion={{
            latitude: userLocation?.latitude || desafio?.location[0][0],        
            longitude: userLocation?.longitude || desafio?.location[0][1],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {desafio && (
            <>
            <Polyline coordinates={desafio.location.map(coord => ({
              latitude: coord[0],
              longitude: coord[1]
            }))}
            strokeWidth={4}
            />
            <Polyline
                coordinates={getUserPath()}
                strokeWidth={2}
                strokeColor="#12FF55"
              />
            </> 
          )}

        {usersParticipants.map((user: UserParticipation, index: number) => (
        <Marker 
          key={index}
          coordinate={user.distance > totalDistance ? {
            latitude: desafio.location[desafio.location.length -1][0],
            longitude: desafio.location[desafio.location.length -1][1],
          } : user.location} 
          style={user.userId === getUserData?.usersId ? {zIndex: 100000, elevation: 100000}: {zIndex: index, elevation: index}}
          > 
          <View className={userPin({intent: user.userId === getUserData?.usersId ? "user" : null})}  >
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} className={photoUser({intent: user.userId === getUserData?.usersId ? "user" : null})}  />
            ) : (
              <Image source={require("../../assets/user2.png")} className="h-[50px] w-[50px] rounded-full " />
            )} 
          </View>
          <Callout tooltip > 
            <View className="p-1 w-[150px] bg-bondis-black mb-2 justify-center items-center rounded-md">
              <Text className="text-bondis-green font-inter-bold">{user.name}</Text>
              <Text className="text-white">{user.distance} Km</Text>
            </View>
          </Callout>        
        </Marker> 
        ))}

        {desafio && (
          <Marker
            coordinate={{
              latitude: desafio.location[desafio.location.length -1][0],
              longitude: desafio.location[desafio.location.length -1][1],
            }}
          >
            <Image source={require("../../assets/final-pin.png")} />
          </Marker>
        )}

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
      
      >
        <BottomSheetScrollView>
          <SafeAreaView className="mx-5">
            <Text className="text-sm font-inter-regular text-bondis-gray-secondary">
              Desafio
            </Text>
            <Text className="text-2xl font-bold font-inter-bold mt-4 mb-4">
              {desafio.name}
            </Text>

            <Progress.Bar progress={userProgress ? userProgress : 0} width={null} height={8} color="#12FF55" unfilledColor="#565656" borderColor="transparent" borderWidth={0} />

            <Text className="font-inter-bold text-base mt-2">{userDistance > totalDistance ? totalDistance.toFixed(3) : userDistance} de {totalDistance.toFixed(3) + " km"}</Text>

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
                  {getUserData.username}
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


