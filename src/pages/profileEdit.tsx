import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import Left from "../../assets/arrow-left.svg";
import { useNavigation } from "@react-navigation/native";
import User from "../../assets/user.svg";

export default function ProfileEdit() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView overScrollMode="never" bounces={false}  >
        <View className="px-5 pb-8 pt-[38px] flex-1">
          <View className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center">
            <Left onPress={() => navigation.navigate("Profile")} />
          </View>

          <Text className="font-inter-bold text-2xl mt-7">
            Mantenha seu perfil atualizado
          </Text>

          <TouchableOpacity className="h-[94px] w-[94px] mt-8 relative">
            <User />
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
          <TextInput
            className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"
            placeholder="__/__/__"
          />

          <Text className="font-inter-bold text-base mt-[23px]">
            Como você se identifica?
          </Text>
          <TextInput
            className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"
            placeholder="__/__/__"
          />

          <Text className="font-inter-bold text-base mt-[23px]">Esportes</Text>
          <TextInput
            className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"
            placeholder="__/__/__"
          />

          <TouchableOpacity className="h-[52px] bg-bondis-green mt-8 rounded-full justify-center items-center">
            <Text className="font-inter-bold text-base">Salvar alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
