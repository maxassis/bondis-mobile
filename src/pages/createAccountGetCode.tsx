import {View, SafeAreaView, Text, TextInput, TouchableOpacity} from 'react-native'
import Close from "../../assets/Close.svg"
import Logo from "../../assets/logo2.svg"
import Arrow from "../../assets/arrow-right.svg"
import { useNavigation } from "@react-navigation/native";

export default function CreateAccountGetCode({ route }: any) {
    const navigation = useNavigation<any>();
    const { name, email } = route.params;

    return(
        <SafeAreaView className="flex-1 bg-white px-5 pt-[38px] pb-8">
            <View className="items-end mb-[10px]">
                <TouchableOpacity className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center">
                    <Close />
                </TouchableOpacity>
            </View>

            <Logo />

            <Text className='text-2xl font-inter-bold mt-4'>{name}, verifique seu e-mail</Text>

            <Text className='mt-4 text-bondis-gray-dark text-base'>Um código de verificação foi enviado para:</Text>
            <Text className='text-[#1977F3] text-base'>{email}</Text>

            <Text className="font-inter-bold text-base mt-8">Informe o código</Text>
            <TextInput className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"/>

            <Text className="font-inter-bold text-base mt-8">Não recebeu o código?</Text>
            <Text className='mt-2 text-base' >Aguarde <Text className='text-[#1977F3] text-base'>1:59</Text> para reenviar</Text>

            <TouchableOpacity onPress={() => navigation.navigate('')} className="h-[52px] flex-row bg-bondis-green mt-auto rounded-full justify-center items-center">
                <Text className="font-inter-bold text-base">Proximo </Text> 
                <Arrow />
            </TouchableOpacity>  
        </SafeAreaView>    
    )

    
}