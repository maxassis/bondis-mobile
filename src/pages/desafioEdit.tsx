import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import KilometerMeterPicker from '../components/distancePicker';
import Left from "../../assets/arrow-left.svg";
import { useNavigation } from "@react-navigation/native";
import Outdoor from "../../assets/Outdoor.svg"
import Indoor from "../../assets/Indoor.svg"
import { LinearGradient } from "expo-linear-gradient";
import { cva } from "class-variance-authority";


const ambienceType = cva(
  "h-[37px] rounded-full justify-center items-center flex-row gap-x-[8px] border-[1px] border-[#D9D9D9] px-4",
  {
    variants: {
      intent: {
        outdoor: "border-0",
        indoor: "border-0",
      },
    },
  }
);

export default function DesafioEdit() {
    const [modalVisible, setModalVisible] = useState(false);
    const [ambience, setAmbience] = useState("Indoor");
    const navigation = useNavigation<any>();

    return(
        <SafeAreaView className='flex-1 bg-white'>
          <View className="pt-[38px] px-5">
          <View className="mb-[10px]">
          <TouchableOpacity
            onPress={() => navigation.navigate("Intro")}
            className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center"
          >
            <Left />
          </TouchableOpacity>
        </View>

        <Text className="text-2xl font-inter-bold mt-7">
          Como foi o sua atividade?
        </Text>

        <Text className="font-inter-bold text-base mt-7">
          Nome da atividade
        </Text>
      
        <TextInput className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4" />
        <Text className='font-inter-bold mt-7 text-base'>Ambiente</Text>
        <View className='flex-row mt-4 gap-x-4'>

          
          <LinearGradient colors={[ambience === "Indoor" ? "rgba(178, 255, 115, 0.322)": "#fff", ambience === "Indoor" ? "#12FF55" : "#fff"]} className={ambienceType({intent: ambience === "Indoor" ? "indoor" : null})}>
            <Outdoor />
            <Text>Ao ar livre</Text>
          </LinearGradient>
          {/* <View className='w-[132px] h-[37px] flex-row items-center gap-x-2 justify-center border-[1px] border-bondis-text-gray rounded-3xl'>
            <Outdoor />
            <Text>Ao ar livre</Text>
          </View> */}
          <LinearGradient colors={[ambience === "Outdoor" ? "rgba(178, 255, 115, 0.322)": "#fff", ambience === "Outdoor" ? "#12FF55" : "#fff"]} className={ambienceType({intent: ambience === "Outdoor" ? "outdoor" : null})}>
            <Indoor />
            <Text>Esteira</Text>
          </LinearGradient>
        </View>
        
      






          </View>
            
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    openButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#007BFF',
      borderRadius: 5,
    },
    openButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });



