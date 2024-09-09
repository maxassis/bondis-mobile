import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import Left from "../../assets/arrow-left.svg";
import { useNavigation } from "@react-navigation/native";
import tokenExists from "../store/auth";

export type DesafioData = Data[]

export interface Data {
  id: number
  userId: string
  desafioId: number
  progress: string
  desafio: Desafio
}

export interface Desafio {
  id: number
  name: string
  description: string
}


export default function DesafioSelect() {
  const navigation = useNavigation<any>();
  const [desafios, setDesafios] = useState<DesafioData>();
  const token = tokenExists((state) => state.token);

  useEffect(() => {
    fetch("https://bondis-app-backend.onrender.com/desafio/getuserdesafio/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json() as Promise<DesafioData>)
      .then((res) => { 
        setDesafios(res)   
      });
  }, []);

  return (
    <SafeAreaView className=" bg-white flex-1">
      <View className="pt-[38px] px-5">
        <View className="mb-[10px]">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center"
          >
            <Left />
          </TouchableOpacity>
        </View>

        <Text className="text-2xl font-inter-bold mt-7 mb-7">
          Escolha um desafio
        </Text>

        {desafios &&
          desafios.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate("TaskCreate", {participationId: item.id, desafioName: item.desafio.name})} className="h-[94px] flex-row items-center px-3 py-[15px] border-b-[1px] border-b-[#D9D9D9]">
              <Image source={require("../../assets/Bg.png")} />
              <View className="ml-5" key={index}>
                <Text className="font-inter-bold">{item.desafio.name}</Text>
                <Text className="font-inter-bold mt-[6.44px]">{item.progress}km </Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </SafeAreaView>
  );
}
