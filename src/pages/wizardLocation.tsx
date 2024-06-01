import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
  } from "react-native";
  
  export default function WizardLocation() {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Image
          source={require("../../assets/phone.png")}
          resizeMode="cover"
          className="h-[50%] w-full"
        />
  
        <Text className="text-center mt-8 font-inter-bold text-2xl">
          Compartilhe a localização
        </Text>
  
        <View className="h-[144px] mt-8 mx-5 justify-between">
          <Text className="text-base text-justify text-bondis-gray-dark">
            A localização é fundamental para melhor experiência no app.
          </Text>
          <Text className="text-base">
            Acesse:{" "}
            <Text className="font-inter-bold">
              Ajustes {">"} Serviços de localização {">"} Meu desafio {">"}{" "}
            </Text>
            E ative a opção{" "}
            <Text className="font-inter-bold">"Durante o uso do app"</Text>
            <Text> e</Text>
            <Text className="font-inter-bold"> "Localização precisa."</Text>
          </Text>
        </View>
  
        <TouchableOpacity
          // onPress={handleSubmit(onSubmit)}
          className="h-[52px] flex-row bg-bondis-green mx-5 mt-8 rounded-full justify-center items-center"
        >
          <Text className="font-inter-bold text-base">Ativar</Text>
        </TouchableOpacity>
  
        <Text className="text-center underline text-base font-inter-bold mt-4">Pular</Text>
      </SafeAreaView>
    );
  }
  