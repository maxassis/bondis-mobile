import { Text, Image, ImageBackground, SafeAreaView, View } from "react-native";
import Logo from "../../assets/Logo3.svg"

const image = { uri: "../../assets/Background-large.png" };

export default function Intro() {
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground className="flex-1 justify-end" source={require("../../assets/Background.png")} resizeMode="cover">
        
        <View className="h-[305px] mb-[79px] px-[21px] items-center">
            <Logo />

            <Text className="mt-[30px] text-base text-center">Olá, seja bem-vindo 👋{"\n"} 
                Pronto para encarar um desafio{"\n"} épico na corrida?
            </Text>

            <View className="rounded-full bg-bondis-green h-[51px] w-full justify-center items-center mt-[31px]">
                <Text className="text-base font-inter-bold">Cadastre-se</Text>
            </View>

            <Text className="text-base mt-4">Ja é cadastrado? <Text className="font-inter-bold underline text-base">Entrar</Text></Text>
        </View>
 
      </ImageBackground>
    </SafeAreaView>
  );
}
