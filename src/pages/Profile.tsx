import { SafeAreaView, Text, View, Image } from "react-native";
import Logo from "../../assets/Logo.svg";
import Settings from "../../assets/settings.svg";
import { StatusBar } from "expo-status-bar";

export default function Profile() {
  return (
    <SafeAreaView>
      <View className="h-[325px] bg-bondis-black">
        <View className="flex-row h-[92px] justify-between mx-4 mt-[35px]">
          <Logo />
          <Image
            source={require("../../assets/Avatar.png")}
            className="w-[72px] h-[72px] mt-auto"
          />
          <Settings />
        </View>

        <Text className="text-bondis-green text-lg font-bold text-center mt-[29px]">
          Nildis da Silva
        </Text>
        <Text className="text-center text-bondis-text-gray text-sm mt-2">
          Desenvolvedora e corredora iniciante
        </Text>

        <View className="flex-row justify-between h-[51px] mt-[29px] mx-4">
          <View>
            <Text className="text-white text-lg text-center font-bold">1</Text>
            <Text className="text-[#828282]">Desafio ativo</Text>
          </View>
          <View>
            <Text className="text-white text-lg text-center font-bold">0</Text>
            <Text className="text-[#828282]">Desafios finalizados</Text>
          </View>
          <View>
            <Text className="text-white text-lg text-center font-bold">
              5 km
            </Text>
            <Text className="text-[#828282]">Percorridos</Text>
          </View>
        </View>
      </View>

      <View className="h-[61px] pl-5">
        <Text className="font-bold text-2xl my-auto">Desafios</Text>
      </View>

      <View className="items-center mx-[15px]">
        <Image className="w-full rounded-2xl" source={require("../../assets/Card.png")} />        
      </View>

      <StatusBar style="light" translucent={false} backgroundColor="#252823" />
    </SafeAreaView>
  );
}
