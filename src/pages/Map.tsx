import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";
import MapView, { Marker, Polyline } from "react-native-maps";
import {
  SafeAreaView,
  StyleSheet,
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
import Bar from "../../assets/Bar.svg";
import Left from "../../assets/arrow-left.svg";
import { Image } from "react-native";
import Winner from "../../assets/winner.svg";
import Terceiro from "../../assets/terceira.svg";
import Segundo from "../../assets/segundo.svg";
import Primeiro from "../../assets/primeiro.svg";
import UserTime from "../components/userTime";
import tokenExists from '../store/auth';
import { getDistance, computeDestinationPoint } from 'geolib';


export interface DesafioType {
  id:            number;
  name:          string;
  description:   string;
  location:      Array<number[]>;
  participation: Participation[];
}

export interface Participation {
  user: User;
}

export interface User {
  id:       string;
  name:     string;
  UserData: UserData | null;
}

export interface UserData {
  avatar_url: string;
}

const routeCoordinates = [
  [-22.88463, -42.00654],
  [-22.88452, -42.00648],
  [-22.88443, -42.00647],
  [-22.88414, -42.0065],
  [-22.88398, -42.00656],
  [-22.8825, -42.00724],
  [-22.88158, -42.00765],
  [-22.88123, -42.00769],
  [-22.88119, -42.00769],
  [-22.88112, -42.00795],
  [-22.8811, -42.00808],
  [-22.8811, -42.0083],
  [-22.88104, -42.0084],
  [-22.88092, -42.00845],
  [-22.88063, -42.00832],
  [-22.88033, -42.00828],
  [-22.87908, -42.0084],
  [-22.87775, -42.00864],
  [-22.87704, -42.00881],
  [-22.87681, -42.00891],
  [-22.87655, -42.00906],
  [-22.87635, -42.0092],
  [-22.87504, -42.01079],
  [-22.87498, -42.01092],
  [-22.87498, -42.01101],
  [-22.87502, -42.01115],
  [-22.87585, -42.01252],
  [-22.87618, -42.01304],
  [-22.8767, -42.01393],
  [-22.87737, -42.01507],
  [-22.87824, -42.0166],
  [-22.87865, -42.0173],
  [-22.87893, -42.01778],
  [-22.87899, -42.01806],
  [-22.87901, -42.01864],
  [-22.879, -42.01871],
  [-22.87894, -42.01875],
  [-22.87875, -42.01877],
  [-22.87857, -42.01891],
  [-22.87848, -42.01911],
  [-22.87846, -42.01918],
  [-22.87868, -42.01968],
  [-22.87875, -42.01988],
  [-22.87886, -42.02032],
  [-22.8789, -42.02059],
  [-22.87893, -42.02099],
  [-22.87887, -42.0214],
  [-22.8788, -42.02161],
  [-22.87873, -42.02186],
  [-22.87833, -42.0223],
  [-22.87821, -42.0224],
  [-22.87814, -42.02242],
  [-22.87802, -42.02242],
  [-22.87768, -42.02232],
  [-22.8775, -42.02226],
  [-22.87717, -42.02216],
  [-22.87701, -42.0222],
  [-22.87693, -42.02226],
  [-22.87678, -42.02235],
  [-22.8765, -42.02243],
  [-22.87593, -42.02244],
  [-22.87527, -42.02246],
  [-22.8749, -42.02251],
  [-22.87454, -42.02259],
  [-22.87405, -42.02274],
  [-22.87353, -42.02292],
  [-22.87297, -42.02317],
  [-22.87247, -42.02347],
  [-22.87216, -42.02369],
  [-22.87147, -42.02434],
  [-22.87092, -42.02494],
  [-22.87044, -42.0256],
  [-22.8699, -42.02645],
  [-22.86921, -42.02733],
  [-22.86766, -42.02916],
  [-22.86649, -42.03064],
  [-22.86566, -42.03167],
  [-22.86549, -42.03193],
  [-22.8652, -42.03238],
  [-22.86509, -42.03251],
  [-22.8649, -42.03271],
  [-22.86474, -42.03283],
  [-22.86446, -42.03295],
  [-22.86429, -42.03299],
  [-22.86412, -42.03299],
  [-22.86371, -42.03289],
  [-22.8633, -42.03282],
  [-22.86299, -42.03283],
  [-22.86271, -42.03287],
  [-22.86204, -42.03306],
  [-22.86171, -42.03318],
  [-22.86155, -42.03326],
  [-22.86144, -42.03334],
  [-22.86101, -42.03373],
  [-22.86053, -42.03419],
  [-22.86012, -42.03452],
  [-22.86009, -42.03455],
  [-22.85996, -42.03473],
  [-22.85989, -42.03492],
  [-22.85985, -42.03516],
  [-22.85981, -42.03577],
  [-22.85975, -42.03625],
  [-22.8597, -42.03641],
  [-22.85962, -42.03656],
  [-22.85945, -42.03679],
  [-22.85918, -42.03706],
  [-22.85885, -42.03728],
  [-22.85835, -42.03757],
  [-22.85816, -42.03764],
  [-22.85787, -42.03771],
  [-22.85723, -42.03795],
  [-22.85696, -42.03809],
  [-22.85659, -42.03832],
  [-22.85627, -42.03855],
  [-22.85622, -42.03864],
  [-22.85603, -42.03881],
  [-22.85575, -42.0391],
  [-22.85561, -42.03927],
  [-22.85534, -42.03973],
  [-22.85514, -42.04021],
  [-22.85503, -42.04061],
  [-22.85499, -42.04101],
  [-22.85502, -42.04148],
  [-22.85537, -42.04306],
  [-22.85557, -42.04394],
  [-22.85564, -42.04441],
  [-22.85565, -42.0447],
  [-22.85564, -42.04543],
  [-22.85557, -42.04579],
  [-22.85548, -42.04611],
  [-22.85526, -42.04674],
  [-22.85518, -42.047],
  [-22.85513, -42.04722],
  [-22.85491, -42.04806],
  [-22.85469, -42.04876],
  [-22.8541, -42.05023],
  [-22.85388, -42.05104],
  [-22.85385, -42.05125],
  [-22.85379, -42.05171],
  [-22.85371, -42.05281],
  [-22.85376, -42.05306],
  [-22.85392, -42.05347],
  [-22.85443, -42.05434],
  [-22.85457, -42.05458],
  [-22.85486, -42.05506],
  [-22.85495, -42.05525],
  [-22.85505, -42.05543],
  [-22.85515, -42.05557],
  [-22.85524, -42.05552],
  [-22.85533, -42.05564],
  [-22.85619, -42.057],
  [-22.85648, -42.05753],
  [-22.85656, -42.05778],
  [-22.85664, -42.05813],
  [-22.85665, -42.05836],
  [-22.85663, -42.05867],
  [-22.85656, -42.05902],
  [-22.85639, -42.05943],
  [-22.85624, -42.05967],
  [-22.85608, -42.05988],
  [-22.85586, -42.0601],
  [-22.85567, -42.06026],
  [-22.85532, -42.0605],
  [-22.85475, -42.06086],
  [-22.85428, -42.06115],
  [-22.85292, -42.06189],
  [-22.85198, -42.06233],
  [-22.8513, -42.06263],
  [-22.85097, -42.06276],
  [-22.85064, -42.06291],
  [-22.84978, -42.06339],
  [-22.84952, -42.06356],
  [-22.84935, -42.06367],
  [-22.84882, -42.06409],
  [-22.84848, -42.06438],
  [-22.84697, -42.06589],
  [-22.84647, -42.06646],
  [-22.84553, -42.06748],
  [-22.84523, -42.06781],
  [-22.845, -42.06808],
  [-22.84465, -42.06845],
  [-22.84383, -42.06926],
  [-22.84208, -42.0711],
  [-22.84042, -42.07289],
  [-22.83982, -42.07354],
  [-22.83935, -42.07403],
  [-22.83813, -42.07534],
  [-22.83743, -42.07611],
  [-22.83659, -42.07701],
  [-22.83591, -42.07775],
  [-22.83525, -42.07848],
  [-22.8347, -42.07902],
  [-22.83431, -42.07948],
  [-22.83404, -42.07992],
  [-22.83374, -42.08057],
  [-22.83315, -42.08202],
  [-22.83264, -42.08318],
  [-22.83225, -42.08395],
  [-22.83186, -42.08462],
  [-22.83067, -42.08676],
  [-22.83042, -42.08726],
  [-22.83016, -42.08796],
  [-22.83009, -42.08831],
  [-22.83005, -42.08868],
  [-22.83004, -42.08874],
  [-22.82997, -42.08877],
  [-22.82985, -42.08879],
  [-22.82974, -42.08878],
  [-22.82932, -42.08839],
  [-22.82903, -42.0891],
  [-22.82887, -42.08972],
  [-22.8288, -42.09015],
  [-22.82878, -42.09033],
  [-22.82871, -42.09061],
  [-22.82865, -42.09082],
  [-22.82863, -42.09089],
  [-22.82858, -42.09091],
  [-22.82853, -42.09094],
  [-22.82838, -42.0912],
  [-22.82806, -42.09175],
  [-22.82774, -42.09231],
  [-22.82756, -42.09264],
  [-22.82749, -42.09265],
  [-22.82718, -42.09262],
  [-22.82698, -42.09257],
  [-22.82655, -42.09242],
  [-22.82569, -42.09212],
  [-22.82486, -42.09183],
  [-22.82385, -42.09148],
  [-22.82298, -42.0912],
  [-22.8223, -42.09093],
  [-22.82126, -42.09055],
  [-22.82004, -42.09011],
  [-22.8177, -42.08922],
  [-22.81746, -42.08911],
  [-22.81722, -42.08897],
  [-22.81695, -42.08872],
  [-22.81686, -42.08863],
  [-22.81699, -42.08835],
  [-22.81711, -42.08811],
  [-22.81718, -42.08795],
  [-22.8177, -42.08669],
  [-22.81777, -42.0865],
  [-22.81781, -42.08632],
  [-22.8179, -42.08604],
  [-22.81813, -42.08554],
  [-22.81824, -42.08527],
  [-22.81832, -42.08506],
  [-22.81771, -42.08478],
  [-22.81777, -42.08463],
  [-22.81765, -42.08446],
  [-22.8176, -42.0845]
];




export default function Map() {
  const navigation = useNavigation<any>();
  const token = tokenExists((state) => state.token)
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [desafio, setDesafio] = useState<DesafioType>({} as DesafioType) ;
  
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
    fetch("http://172.22.0.1:3000/desafio/getdesafio/19", {
      headers: {
        "Content-type": "application/json",
        authorization:
            "Bearer " + token
      },
    })
    .then((response) => response.json() as Promise<DesafioType>)
    .then((data) => {
      setDesafio(data);
    })
  }, []);


  return (
    <View className="flex-1 bg-white justify-center items-center relative">
      {location && (
        <MapView
          className="flex-1 w-full"
          // ref={mapRef}
          initialRegion={{
            latitude: desafio?.location[0][0],        // [-22.88463, -42.00654]
            longitude: desafio?.location[0][1],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {desafio && (
            <Polyline coordinates={desafio.location.map(coord => ({
              latitude: coord[0],
              longitude: coord[1]
            }))} />
          )}


        {/* <Polyline coordinates={routeCoordinates.map(coord => ({
          latitude: coord[0],
          longitude: coord[1]
        }))} /> */}
        
          <Marker coordinate={location.coords} />
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


