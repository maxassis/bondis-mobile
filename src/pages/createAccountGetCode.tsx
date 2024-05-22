import {View, SafeAreaView, Text, TextInput, TouchableOpacity} from 'react-native'
import Close from "../../assets/Close.svg"
import Logo from "../../assets/logo2.svg"

export default function CreateAccountGetCode() {
    return(
        <SafeAreaView className="flex-1 bg-white px-5 pt-[38px]">
            <View className="items-end mb-[10px]">
                <TouchableOpacity className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center">
                    <Close />
                </TouchableOpacity>
            </View>

            <Logo />

            <Text className='text-2xl font-inter-bold mt-4'>Manuela, verifique seu e-mail</Text>

            <Text className='mt-4 text-bondis-gray-dark text-base'>Um código de verificação foi enviado para:</Text>
            <Text className='text-[#1977F3] text-base'>bondis@gmail.com</Text>

            <Text className="font-inter-bold text-base mt-8">Informe o código</Text>
            <TextInput className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"/>

            <Text className="font-inter-bold text-base mt-8">Não recebeu o código?</Text>
            <Text className='mt-2 text-base' >Aguarde <Text className='text-[#1977F3] text-base'>1:59</Text> para reenviar</Text>
        </SafeAreaView>    
    )

    
}