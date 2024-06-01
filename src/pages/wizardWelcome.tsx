import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import Logo from "../../assets/logo2.svg";
import Run from "../../assets/run-green.svg";
import Progress from "../../assets/progress.svg";
import Podium from "../../assets/podium.svg";

export default function WizardWelcome() {
  return (
    <SafeAreaView className="flex-1 bg-white pt-12 px-5 pb-8">
      <View className="h-[130px] pt-8 items-center">
        <View className="w-2/12">
          <Logo />
        </View>
        <Text className="mt-4 font-inter-bold text-2xl">
          Bem vindo ao{"\n"} seu desafio!
        </Text>
      </View>

      <View className="h-[72px] flex-row mt-12 justify-center items-center">
        <View className="w-2/12">
          <Run />
        </View>
        <View className="w-10/12">
          <Text numberOfLines={3} className="text-base">
            <Text className="font-inter-bold">
              Conquiste distâncias épicas:
            </Text>{" "}
            Complete desafios virtuais no seu ritmo.
          </Text>
        </View>
      </View>

      <View className="h-[72px] w-full flex-shrink-1 flex-row mt-6 justify-center items-center ">
        <View className="w-2/12">
          <Progress />
        </View>
        <View className="w-10/12">
          <Text numberOfLines={3} className="text-base">
            <Text className="font-inter-bold">Acompanhe seu progresso</Text> e
            de seus amigos em um mapa imersivo e interativo
          </Text>
        </View>
      </View>

      <View className="h-[72px] w-full flex-shrink-1 flex-row mt-6 justify-center items-center ">
        <View className="w-2/12">
          <Podium />
        </View>
        <View className="w-10/12">
          <Text numberOfLines={3} className="text-base flex-wrap">
            <Text className="font-inter-bold flex-wrap">
              Acompanhe o ranking histórico
            </Text> do desafio e supere seus limites.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        // onPress={handleSubmit(onSubmit)}
        className="h-[52px] flex-row bg-bondis-green mt-auto rounded-full justify-center items-center"
      >
        <Text className="font-inter-bold text-base">Proximo </Text>
      </TouchableOpacity>  



    </SafeAreaView>
  );
}
