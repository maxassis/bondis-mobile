import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import KilometerMeterPicker from "../components/distancePicker";
import Left from "../../assets/arrow-left.svg";
import { useNavigation } from "@react-navigation/native";
import Outdoor from "../../assets/Outdoor.svg";
import Indoor from "../../assets/Indoor.svg";
import { LinearGradient } from "expo-linear-gradient";
import { cva } from "class-variance-authority";
import Down from "../../assets/down.svg";

const ambienceType = cva(
  "h-[37px] rounded-full justify-center items-center flex-row gap-x-[8px] border-[1px] border-[#D9D9D9] pr-4 pl-2",
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

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <ScrollView className=" flex-1" showsVerticalScrollIndicator={false} overScrollMode="never">
        <View className="mb-[10px] pt-[38px]">
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
        <Text className="font-inter-bold mt-7 text-base">Ambiente</Text>
        <View className="flex-row mt-4 gap-x-4 ml-[-8px]">
          <TouchableOpacity onPress={() => setAmbience("Indoor")}>
            <LinearGradient
              colors={[
                ambience === "Indoor" ? "rgba(178, 255, 115, 0.322)" : "#fff",
                ambience === "Indoor" ? "#12FF55" : "#fff",
              ]}
              className={ambienceType({
                intent: ambience === "Indoor" ? "indoor" : null,
              })}
            >
              <Outdoor />
              <Text>Ao ar livre</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setAmbience("Outdoor")}>
            <LinearGradient
              colors={[
                ambience === "Outdoor" ? "rgba(178, 255, 115, 0.322)" : "#fff",
                ambience === "Outdoor" ? "#12FF55" : "#fff",
              ]}
              className={ambienceType({
                intent: ambience === "Outdoor" ? "outdoor" : null,
              })}
            >
              <Indoor />
              <Text>Esteira</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text className="font-inter-bold text-base mt-7">Data</Text>
        <TouchableOpacity className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 items-end justify-center pr-[22px]">
          <Down />
        </TouchableOpacity>

        <Text className="font-inter-bold text-base mt-7">
          Duração da atividade
        </Text>
        <TouchableOpacity className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 items-end justify-center pr-[22px]">
          <Down />
        </TouchableOpacity>

        <Text className="font-inter-bold text-base mt-7">
          Distancia percorrida
        </Text>

        <KilometerMeterPicker
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 items-end justify-center pr-[22px]"
        >
          <Down />
        </TouchableOpacity>

        <Text className="font-inter-bold text-base mt-7">
          Calorias queimadas
        </Text>
        <TextInput className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 items-end justify-center pr-[22px] pl-4" />

        <Text className="font-inter-bold text-base mt-7">
          Local
        </Text>
        <TextInput className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 items-end justify-center pr-[22px] pl-4" />      

        <TouchableOpacity
          className="h-[52px] bg-bondis-green mt-[69px] mb-8 rounded-full justify-center items-center"
        >
          <Text className="font-inter-bold text-base">Cadastrar atividade</Text>
        </TouchableOpacity>      

      </ScrollView>
    </SafeAreaView>
  );
}
