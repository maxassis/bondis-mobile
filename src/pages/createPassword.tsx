import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity } from "react-native"
import Close from "../../assets/Close.svg"
import Logo from "../../assets/logo2.svg"

export default function CreatePassword() {
    const navigation = useNavigation<any>();

    return(
        <SafeAreaView className="flex-1 bg-white px-5 pt-[38px]">
            <View className="items-end mb-[10px]">
                <TouchableOpacity onPress={() => navigation.navigate('Intro')} className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center">
                    <Close />
                </TouchableOpacity>
            </View>

            <Logo />

            <Text className="font-inter-bold mt-4 text-2xl">Crie uma senha</Text>

            <Text className="font-inter-bold text-base mt-8">Senha</Text>
            <TextInput placeholder="E-mail" className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"/>

            <View className="p-4 border-[1px] border-[#D9D9D9] mt-8 rounded-[4px]">
                <Text className="font-inter-bold text-sm mb-[10px]">Sua senha deve conter:</Text>
                <View className="flex-row items-center mb-2 gap-x-[9px]">
                    <Close />
                    <Text>Mínimo de 8 caracteres</Text>
                </View>
                <View className="flex-row items-center mb-2 gap-x-[9px]">
                    <Close />
                    <Text>1 letra maiúscula</Text>
                </View>
                <View className="flex-row items-center mb-2 gap-x-[9px]">
                    <Close />    
                    <Text>1 letra minúscula</Text>
                </View>
                <View className="flex-row items-center mb-2 gap-x-[9px]">
                <Close />
                    <Text>1 numeral</Text>
                </View>
                <View className="flex-row items-center gap-x-[9px]">
                    <Close />    
                    <Text>1 caractere especial (!@#$%ˆ&*()</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('AccountDone')} className="h-[52px] flex-row bg-bondis-green mt-8 rounded-full justify-center items-center">
                <Text className="font-inter-bold text-base">Criar conta </Text> 
            </TouchableOpacity>

            <Text className="text-center mt-8">Ao criar sua conta no Meu Desafio você concorda 
            com os <Text className="font-inter-bold text-sm underline">Termos de serviço
            </Text> e <Text className="font-inter-bold text-sm underline">Politica de Privacidade</Text>
            </Text>   
        </SafeAreaView>
    )
}