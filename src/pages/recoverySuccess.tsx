import { View, Text, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import GreenCheck from "../../assets/green-check.svg";
import Close from "../../assets/Close.svg";
import { useNavigation } from "@react-navigation/native";

export default function RecoverySuccess() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-[38px] pb-8">
      <View className="items-end mb-[10px]">
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center"
        >
          <Close />
        </TouchableOpacity>
      </View>

      <View className="h-full items-center justify-center">
        <View className="gap-y-4 items-center pb-4">
          <GreenCheck />
          <Text className="font-inter-bold text-lg">
            Nova senha cadastrada com sucesso!
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")} className="w-[335px] h-[52px] border-[0.5px] border-[#D9D9D9] rounded-full mt-[10px] justify-center items-center">
          <Text className="font-inter-bold text-base">Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
