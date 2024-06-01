import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

export default function WizardSincronization() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Image
        source={require("../../assets/services.png")}
        resizeMode="cover"
        className="h-[50%] w-full"
      />

      <Text className="text-center mt-8 font-inter-bold text-2xl mx-5">
        Conecte o Meu desafio com o app Saúde ou Strava
      </Text>

      <View className="h-[144px] mt-8 mx-5 justify-between">
        <Text className="text-base text-justify text-bondis-gray-dark">
          Facilite sua experiência de uso através da conexão automatica com o
          app <Text className="font-inter-bold text-black">Saúde da Apple</Text>{" "}
          <Text>ou</Text>{" "}
          <Text className="font-inter-bold text-black">Strava</Text>
        </Text>
      </View>

      <TouchableOpacity
        // onPress={handleSubmit(onSubmit)}
        className="h-[52px] flex-row bg-bondis-green mx-5 mt-8 rounded-full justify-center items-center"
      >
        <Text className="font-inter-bold text-base">Conectar</Text>
      </TouchableOpacity>

      <Text className="text-center underline text-base font-inter-bold mt-4">
        Pular
      </Text>
    </SafeAreaView>
  );
}
