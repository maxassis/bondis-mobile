import { Text, View, SafeAreaView, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Close from "../../assets/Close.svg"
import Logo from "../../assets/logo2.svg"

export default function Recovery() {
    const navigation = useNavigation<any>();

    return(
        <SafeAreaView className="flex-1 bg-white px-5 pt-[38px]">
             <View className="items-end mb-[10px]">
                <TouchableOpacity onPress={() => navigation.navigate('Login')} className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center">
                        <Close />
                </TouchableOpacity>
            </View>

            <View className="h-[368px] pt-8">
              <Logo /> 

              <Text className="font-inter-bold text-2xl mt-4">Recupere seu acesso</Text> 
              <Text className="text-bondis-gray-dark mt-4">Informe um e-mail válido para redefinir sua senha:</Text>

              <Text className="font-inter-bold text-base mt-8">E-mail</Text>  
              <TextInput className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4" />  

              <TouchableOpacity className="h-[52px] bg-bondis-green mt-8 rounded-full justify-center items-center">
                <Text className="font-inter-bold text-base">Recuperar senha</Text>
              </TouchableOpacity>  


            </View>

            



        </SafeAreaView>
    )
}