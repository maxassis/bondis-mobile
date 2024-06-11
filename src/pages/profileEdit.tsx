import { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import Left from "../../assets/arrow-left.svg";
import { useNavigation } from "@react-navigation/native";
import User from "../../assets/user.svg";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from 'expo-document-picker';

export default function ProfileEdit() {
  const navigation = useNavigation<any>();
  const [maskedValue, setMaskedValue] = useState("");
  const [unMaskedValue, setUnmaskedValue] = useState("");
  const [image, setImage] = useState("");

  const handleImagePicker = async () => {
  const result = await ImagePicker.getDocumentAsync({
      type: ["image/*"],
    })

  if(!result.canceled) {
    setImage(result.assets[0].uri)
  }  
  }


  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView overScrollMode="never" bounces={false}>
        <View className="px-5 pb-8 pt-[38px] flex-1">
          <View className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center">
            <Left onPress={() => navigation.navigate("Profile")} />
          </View>

          <Text className="font-inter-bold text-2xl mt-7">
            Mantenha seu perfil atualizado
          </Text>

          <TouchableOpacity onPress={handleImagePicker} className="h-[94px] w-[94px] mt-8 relative">
            {image ? <Image source={{uri: image}} className="w-[94px] h-[94px] rounded-full" /> 
              :
             <User />  
            }

            <Image
              source={require("../../assets/cam.png")}
              className="absolute bottom-[-15px] right-[-10px]"
            />
          </TouchableOpacity>

          <Text className="font-inter-bold text-base mt-[23px]">Nome</Text>
          <TextInput
            className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"
            placeholder="Nome completo"
          />

          <Text className="font-inter-bold text-base mt-[23px]">Bio</Text>
          <TextInput
            multiline={true}
            numberOfLines={3}
            placeholder="Escreva um pouco sobre você..."
            className="bg-bondis-text-gray rounded-[4px] h-[144px] mt-2 p-4"
            style={{ textAlignVertical: "top" }}
          />

          <Text className="font-inter-bold text-base mt-[23px]">
            Data de Nascimento
          </Text>
          <MaskedTextInput
            mask="99/99/9999"
            onChangeText={(text, rawText) => {
              setMaskedValue(text);
              setUnmaskedValue(rawText);
            }}
            className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"
            keyboardType="numeric"
          />

          <Text className="font-inter-bold text-base mt-[23px]">
            Como você se identifica?
          </Text>
          <TextInput className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4" />

          <Text className="font-inter-bold text-base mt-[23px]">Esportes</Text>
          <TextInput className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4" />

          <TouchableOpacity className="h-[52px] bg-bondis-green mt-8 rounded-full justify-center items-center">
            <Text className="font-inter-bold text-base">Salvar alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
