import { useRef, useMemo } from "react";
import { SafeAreaView, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Logo from "../../assets/logo-white.svg"
import Settings from "../../assets/settings.svg";
import { StatusBar } from "expo-status-bar";
import Map from "../../assets/map.svg"
import Plus from "../../assets/plus.svg"

export default function Profile() {
  const navigation = useNavigation<any>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%"], []);

  const handleClosePress = () => bottomSheetRef.current?.expand();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-[325px] bg-bondis-black">
        <View className="flex-row h-[92px] justify-between mx-4 mt-[35px]">
          <Logo />
          <Image
            source={require("../../assets/Avatar.png")}
            className="w-[72px] h-[72px] mt-auto"
          />
          <Settings onPress={() => navigation.navigate('Configurations')}/>
        </View>

        <Text className="text-bondis-green text-lg font-inter-bold text-center mt-[29px]">
          Nildis da Silva
        </Text>
        <Text className="text-center text-bondis-text-gray font-inter-regular text-sm mt-2">
          Desenvolvedora e corredora iniciante
        </Text>

        <View className="flex-row justify-between h-[51px] mt-[29px] mx-4">
          <View>
            <Text className="text-white text-lg text-center font-inter-bold">1</Text>
            <Text className="text-[#828282] font-inter-regular">Desafio ativo</Text>
          </View>
          <View>
            <Text className="text-white text-lg text-center font-inter-bold">0</Text>
            <Text className="text-[#828282] font-inter-regular">Desafios finalizados</Text>
          </View>
          <View>
            <Text className="text-white text-lg text-center font-inter-bold">
              5 km
            </Text>
            <Text className="text-[#828282] font-inter-regular">Percorridos</Text>
          </View>
        </View>
      </View>

      <View className="h-[61px] pl-5">
        <Text className="font-inter-bold text-2xl my-auto">Desafios</Text>
      </View>

      <View  className="items-center mx-[15px] relative">
        <Image className="w-full rounded-2xl" source={require("../../assets/Card.png")} /> 
        <TouchableOpacity onPress={() => navigation.navigate('Map')} className="h-[79px] w-11/12 flex-row p-4 rounded-xl justify-between bg-white absolute bottom-[63px]">
            <View>
              <Text className="font-inter-bold text-[16.86px]">Cidade Maravilhosa</Text>
              <View className="flex-row items-center">
                <Text className="font-inter-bold text-base">154km</Text>
                <Text className="ml-8 text-[#757575] text-xs font-inter-regular">3,3% completado</Text>
              </View>
            </View>
            <Map />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => bottomSheetRef.current?.expand()} className="rounded-full bg-bondis-green absolute w-16 h-16 justify-center items-center right-0 bottom-2">
          <Plus />
        </TouchableOpacity>
      </View>


      <StatusBar style="light" translucent={false} backgroundColor="#252823" />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose
      >
        <BottomSheetView className="flex-1">
          <Text className="font-inter-bold mt-[10px] text-base mx-5 mb-4">Adicione um atividade</Text>
          <View className="h-[153px] mx-5">
              <View className="h-[33.33%] justify-center items-center border-b-[0.2px] border-b-gray-400">
                <Text>Via Strava</Text>
              </View>
              <View className="h-[33.33%] justify-center items-center border-b-[0.2px] border-b-gray-400">
                <Text>Via Apple Saúde</Text>
              </View>
              <View className="h-[33.33%] justify-center items-center border-b-[0.2px] border-b-gray-400">
              <Text>Cadastrar manualmente</Text>
              </View>
          </View>
        </BottomSheetView>
        
      </BottomSheet> 
    </SafeAreaView>
  );
}

