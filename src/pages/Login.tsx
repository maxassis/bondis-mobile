import { useNavigation } from "@react-navigation/native";
import { Text, View, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import Close from "../../assets/Close.svg"
import Logo from "../../assets/logo2.svg"
import Google from "../../assets/google.svg"
import Facebook from "../../assets/facebook.svg"
import Apple from "../../assets/apple.svg"

export default function Login() {
    const navigation = useNavigation<any>();

    return(
        <SafeAreaView className="pt-[38px] px-5 bg-white flex-1">
            <View className="items-end mb-[10px]">
                <View className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center">
                    <TouchableOpacity onPress={() => navigation.navigate('Intro')} >
                        <Close />
                    </TouchableOpacity>
                </View>
            </View>

            <Logo />

            <Text className="font-inter-bold mt-4 text-2xl">Login</Text>
            <Text className="text-[#565656] mt-4 text-base">Informe seu e-mail e senha de acesso:</Text>

            <Text className="font-inter-bold text-base mt-8">E-mail</Text>
            <TextInput placeholder="E-mail" className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"/>

            <Text className="mt-8 font-inter-bold text-base">Senha</Text>
            <TextInput placeholder="Senha" className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"/>

            <Text className="mt-8 font-inter-regular text-center">Esqueceu a senha ? <Text className="font-inter-bold underline" onPress={() => navigation.navigate('Recovery')}>Recuperar</Text></Text> 

            <TouchableOpacity className="h-[52px] bg-bondis-green mt-8 rounded-full justify-center items-center">
                <Text className="font-inter-bold text-base">Entrar</Text>
            </TouchableOpacity>   

            <Text className="text-center mt-8 text-base text-bondis-gray-dark">Ou entre em sua conta:</Text>

            <View className="flex-row mt-4 justify-center gap-x-7">
                <Google />
                <Facebook />
                <Apple />               
            </View>
        </SafeAreaView>
    )
}
