import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import Close from "../../assets/Close.svg";

export default function Connections() {
  return (
    <SafeAreaView className="flex-1 bg-white pt-[35px] px-5">
      <View className="items-end mb-[10px]">
        <TouchableOpacity
          //   onPress={() => navigation.navigate("Intro")}
          className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center"
        >
          <Close />
        </TouchableOpacity>
      </View>

      <Text className="text-2xl font-inter-bold mt-7">Conexões</Text>

      <Text className="text-base mt-4 text-justify text-bondis-gray-dark">
        Sincronize seu app agora e acompanhe seu progresso automaticamente.
      </Text>

      <View className="h-[90px] mt-7 px-4 flex-row justify-between items-center border-b-[0.2px] border-b-gray-400">
        <Text className="text-base">Apple Saúde</Text>
        <TouchableOpacity className="w-[60px] h-[32px] bg-bondis-green justify-center items-center">
          <Text>Apple</Text>
        </TouchableOpacity>
      </View>
      <View className="h-[90px] justify-between items-center px-4 flex-row border-b-[0.2px] border-b-gray-400">
        <Text className="text-base">Strava</Text>
        <TouchableOpacity className="w-[60px] h-[32px] bg-bondis-green justify-center items-center">
          <Text>Strava</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
