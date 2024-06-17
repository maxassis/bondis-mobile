import { useState, useRef, useMemo, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Dimensions,
  BackHandler,
  StyleSheet,
} from "react-native";
import Left from "../../assets/arrow-left.svg";
import { useNavigation } from "@react-navigation/native";
import User from "../../assets/user.svg";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Down from "../../assets/down.svg";
import tokenExists from "../store/auth";
import RNPickerSelect from "react-native-picker-select";

type File = {
  type: string;
  uri: string;
  name: string;
};

type FormData = {
  fullName: string;
  bio: string;
};

interface UserData {
  id: string;
  avatar_url: string | null;
  avatar_filename: string | null;
  full_name: string | null;
  bio: string | null;
  gender: string | null;
  sport: string | null;
  createdAt: Date;
  usersId: string;
  name: string;
}

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB em bytes

export default function ProfileEdit() {
  const token = tokenExists((state) => state.token);
  const navigation = useNavigation<any>();
  const [gender, setGender] = useState("");
  const [sports, setSports] = useState("");
  const [bioValue, setBioValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [unMaskedValue, setUnmaskedValue] = useState("");
  const [userData, setUserData] = useState<UserData>({} as UserData);
  // const [image, setImage] = useState("");
 
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  
  const pickImage = async () => {
    let { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
      allowsMultipleSelection: false,
    });

    if (!canceled && assets) {
      const fileSize = assets[0].uri ? await getFileSize(assets[0].uri) : 0;

      if (fileSize > MAX_FILE_SIZE) {
        Alert.alert(
          "Erro",
          "O arquivo é muito grande. O tamanho máximo permitido é 3 MB."
        );
        return;
      }

      const filename = assets[0].uri.split("/").pop();
      const extend = filename!.split(".").pop();

      const formData = new FormData();
      formData.append("file", {
        name: filename,
        uri: assets[0].uri,
        type: "image/" + extend,
      } as any);

      try {
        const response = await fetch(
          "http://172.22.0.1:3000/users/uploadavatar",
          {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: "Bearer " + token,
            },
            body: formData,
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log("Upload successful", responseData);
          // setImage(assets[0].uri);
        } else {
          console.error("Upload failed!", response.status);
        }
      } catch (error) {
        console.error("Upload error", error);
      }
    }
  };

  useEffect(() => {
    fetch("http://172.22.0.1:3000/users/getUserData", {
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json() as Promise<UserData>)
      .then((data) => {
        console.log(data);
        setUserData(data);
        setGender(data.gender ?? "");
        setSports(data.sport ?? "");
        setNameValue(data.full_name ?? "");
        setBioValue(data.bio ?? "");
      });
  }, []);

  const getFileSize = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob.size;
    } catch (error) {
      console.error("Erro ao obter o tamanho do arquivo:", error);
      return 0;
    }
  };

  function submitForm() {
    console.log("heheheheh")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView overScrollMode="never" bounces={false}>
        <View className="px-5 pb-8 pt-[38px] flex-1">
          <View className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center">
            <Left onPress={() => navigation.goBack()} />
          </View>
          <Text className="font-inter-bold text-2xl mt-7">
            Mantenha seu perfil atualizado
          </Text>

          <TouchableOpacity
            // onPress={handleOpenPhoto}
            className="h-[94px] w-[94px] mt-8 relative"
          >
            {userData.avatar_url ? (
              <Image
                source={{ uri: userData.avatar_url }}
                className="w-[94px] h-[94px] rounded-full"
              />
            ) : (
              <User />
            )}

            <Image
              source={require("../../assets/cam.png")}
              className="absolute bottom-[-15px] right-[-10px]"
            />
          </TouchableOpacity>

          <Text className="font-inter-bold text-base mt-[23px]">Nome</Text>
          <TextInput
            placeholder="Nome completo"
            value={nameValue}
            autoCapitalize="none"
            onChangeText={setNameValue}
            className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"
          />

          <Text className="font-inter-bold text-base mt-[23px]">Bio</Text>
          <TextInput
            placeholder="Escreva um pouco sobre você..."
            numberOfLines={3}
            value={bioValue}
            autoCapitalize="none"
            onChangeText={setBioValue}
            className="bg-bondis-text-gray rounded-[4px] h-[144px] mt-2 p-4"
            style={{ textAlignVertical: "top" }}
          />

          <Text className="font-inter-bold text-base mt-[23px]">
            Data de Nascimento
          </Text>
          <MaskedTextInput
            placeholder="__/__/____"
            mask="99/99/9999"
            onChangeText={(text, rawText) => {
              setUnmaskedValue(rawText);
            }}
            className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"
            keyboardType="numeric"
          />

          <Text className="font-inter-bold text-base mt-[23px]">
            Como você se identifica?
          </Text>
          <RNPickerSelect
            style={pickerStyle}
            useNativeAndroidPickerStyle={false}
            onValueChange={(value) => console.log(value)}
            Icon={() => <Down />}
            value={userData.gender}
            placeholder={{ label: "Selecione", value: null }}
            items={[
              { label: "Homem", value: "homem" },
              { label: "Mulher", value: "mulher" },
              { label: "Não binário", value: "nao_binario" },
              {
                label: "Prefiro não responder",
                value: "prefiro_nao_responder",
              },
            ]}
          />

          <Text className="font-inter-bold text-base mt-[23px]">Esportes</Text>
          <RNPickerSelect
            style={pickerStyle}
            useNativeAndroidPickerStyle={false}
            onValueChange={(value) => console.log(value)}
            Icon={() => <Down />}
            value={userData.sport}
            placeholder={{ label: "Selecione", value: null }}
            items={[
              { label: "Corrida", value: "corrida" },
              { label: "Ciclismo", value: "ciclismo" },
            ]}
          />

          <TouchableOpacity
            onPress={submitForm}
            className="h-[52px] bg-bondis-green mt-8 rounded-full justify-center items-center"
          >
            <Text className="font-inter-bold text-base">Salvar alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const pickerStyle = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#EEEEEE",
    fontSize: 14,
    height: 52,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    backgroundColor: "#EEEEEE",
    fontSize: 14,
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 4,
    color: "black",
    marginTop: 8,
  },
  placeholder: {
    color: "gray",
    fontSize: 14,
  },
  iconContainer: {
    top: 23,
    right: 12,
  },
});
