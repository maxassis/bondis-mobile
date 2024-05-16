import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native"
import Close from "../../assets/Close.svg"

export default function AccountDone() {
    const navigation = useNavigation<any>();

    return(
        <SafeAreaView className="flex-1 bg-white px-5 pt-[38px]">
            <View className="items-end mb-[10px]">
                <TouchableOpacity className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center">
                    <Close />
                </TouchableOpacity>
            </View>

            <Text className="font-inter-bold mt-4 text-2xl">Sua conta foi criada com sucesso!</Text>

            <Text className="text-sm text-[#565656] mt-8">bora começar um desafio?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('CreatePassword')} className="h-[52px] flex-row bg-bondis-green mt-8 rounded-full justify-center items-center">
                <Text className="font-inter-bold text-base">Bora 💪</Text> 
            </TouchableOpacity>  
        </SafeAreaView>    
    )
}