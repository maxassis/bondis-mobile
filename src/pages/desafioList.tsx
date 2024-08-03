import { SafeAreaView, View, Text } from "react-native";
import Left from "../../assets/Icon-left.svg";
import Livre from "../../assets/livre.svg";
import Calendar from "../../assets/calendar.svg";
import Pin from "../../assets/map-pin.svg";
import Gear from "../../assets/settings-black.svg";
import Link from "../../assets/link.svg";

export default function DesafioList() {
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white px-5 flex-1">
        <View className="flex-row mt-[49.5]">
          <Left className="" />
          <Text className="text-base font-inter-bold mx-auto ">
            Atividades recentes
          </Text>
        </View>

        <View className="h-[60px] mt-4 pt-2 px-5 mb-7">
          <Text className="text-sm text-bondis-gray-secondary">Desafio</Text>
          <Text className="text-base font-inter-bold mt-2">
            Cidade Maravilhosa
          </Text>
        </View>

        <View className="h-[165px] p-5">
          <View className="flex-row w-full h-[42px]">
            <View className="h-[42px] flex-row">
              <Livre />
              <View className="ml-4 ">
                <Text className="text-base font-inter-bold">
                  Atividade matinal
                </Text>
                <View className="flex-row">
                  <View className="flex-row gap-x-1 items-center justify-center">
                    <Calendar />
                    <Text className="text-bondis-gray-dark text-xs">
                      Há 2 dias
                    </Text>
                  </View>
                  <View className="flex-row gap-x-1 items-center justify-center ml-4">
                    <Pin />
                    <Text className="text-bondis-gray-dark text-xs ml-4">
                      Rio de Janeiro
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="ml-auto w-[40px] h-[32px] items-end">
              <Gear />
            </View>
          </View>

          <View className="flex-row items-center gap-x-1 mt-3">
            <Link />
            <Text className="text-xs text-bondis-gray-dark">Sincronizado via Strava</Text>
          </View> 

          <View className="flex-row mt-3">
            <View className="w-[98px] h-[44px] border-l-2 border-[#D1D5DA] pl-2">
                <Text className="text-[18px] font-inter-bold">5,50</Text>
                <Text className="text-bondis-gray-dark text-[10px]">KM</Text>
            </View>
            <View className="w-[98px] h-[44px] border-l-2 border-[#D1D5DA] pl-2">
                <Text className="text-[18px] font-inter-bold">38:45</Text>
                <Text className="text-bondis-gray-dark text-[10px]">DURAÇÃO</Text>
            </View>
            <View className="w-[98px] h-[44px] border-l-2 border-[#D1D5DA] pl-2">
                <Text className="text-[18px] font-inter-bold">300</Text>
                <Text className="text-bondis-gray-dark text-[10px]">CAL</Text>
            </View>
          </View> 


        </View>
      </View>
    </SafeAreaView>
  );
}
