import { useState, useRef, useMemo } from "react";
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
} from "react-native";
import Left from "../../assets/arrow-left.svg";
import { useNavigation } from "@react-navigation/native";
import User from "../../assets/user.svg";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Down from "../../assets/down.svg";

type File = {
  type: string;
  uri: string;
  name: string;
};

type FormData = {
  fullName: string;
  bio: string;
};

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB em bytes

export default function ProfileEdit() {
  const navigation = useNavigation<any>();
  const [gender, setGender] = useState("");
  const [sports, setSports] = useState("");
  const [unMaskedValue, setUnmaskedValue] = useState("");
  const [initialSnapIndex, setInitialSnapIndex] = useState(-1);
  const [image, setImage] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetRef2 = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["1%", "35%"], []);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  function handleOpenSports() {
    const screenHeight = Dimensions.get("window").height;

    const closestSnapPoint = snapPoints.findIndex(
      (snapPoint) => parseInt(snapPoint) >= screenHeight / 100
    );

    setInitialSnapIndex(closestSnapPoint);
    bottomSheetRef2.current?.snapToIndex(closestSnapPoint);
  }

  function handleOpenGender() {
    const screenHeight = Dimensions.get("window").height;

    const closestSnapPoint = snapPoints.findIndex(
      (snapPoint) => parseInt(snapPoint) >= screenHeight / 100
    );

    setInitialSnapIndex(closestSnapPoint);
    bottomSheetRef.current?.snapToIndex(closestSnapPoint);
  }

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
    bottomSheetRef2.current?.close();
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    handleClosePress
  );

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
              authorization:
                "Bearer " +
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYm9uZGlzOCIsImVtYWlsIjoiYm9uZGlzOEB0ZXN0ZS5jb20iLCJpZCI6ImNseGNvdjlnMDAwMDBsbzF1cnUxdTFkNHYiLCJpYXQiOjE3MTgzMTY5NjMsImV4cCI6MTcyNjA5Mjk2M30.Ft24bhunWUzJARcGdCOeFR-DPMbOC-tqkz6klkhM_Ak",
            },
            body: formData,
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log("Upload successful", responseData);
          setImage(assets[0].uri);
        } else {
          console.error("Upload failed!", response.status);
        }
      } catch (error) {
        console.error("Upload error", error);
      }
    }
  };

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

  function onSubmit(data: FormData) {
    console.log(data);
    console.log(unMaskedValue);
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={handleClosePress}>
        <ScrollView overScrollMode="never" bounces={false}>
          <View className="px-5 pb-8 pt-[38px] flex-1">
            <View className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center">
              <Left onPress={() => navigation.navigate("Profile")} />
            </View>
            <Text className="font-inter-bold text-2xl mt-7">
              Mantenha seu perfil atualizado
            </Text>

            <TouchableOpacity
              onPress={pickImage}
              className="h-[94px] w-[94px] mt-8 relative"
            >
              {image ? (
                <Image
                  source={{ uri: image }}
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
            <Controller
              control={control}
              name="fullName"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  placeholder="Nome completo"
                  value={value}
                  autoCapitalize="none"
                  onChangeText={onChange}
                  className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"
                />
              )}
            />

            <Text className="font-inter-bold text-base mt-[23px]">Bio</Text>
            <Controller
              control={control}
              name="bio"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  placeholder="Escreva um pouco sobre você..."
                  numberOfLines={3}
                  value={value}
                  autoCapitalize="none"
                  onChangeText={onChange}
                  className="bg-bondis-text-gray rounded-[4px] h-[144px] mt-2 p-4"
                  style={{ textAlignVertical: "top" }}
                />
              )}
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
            <TouchableOpacity
              onPress={handleOpenGender}
              className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 px-4 justify-center"
            >
              {gender ? <Text>{gender}</Text> : (
                <View className="flex-row justify-between">
                <Text className="text-bondis-gray-dark">Selecione</Text> 
                <Down/> 
                </View>
                )}
            </TouchableOpacity>

            <Text className="font-inter-bold text-base mt-[23px]">
              Esportes
            </Text>
            <TouchableOpacity
              onPress={handleOpenSports}
              className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 px-4 justify-center"
            >
              {sports ? <Text>{sports}</Text> : (
                <View className="flex-row justify-between">
                <Text className="text-bondis-gray-dark">Selecione</Text> 
                <Down/> 
                </View>
                )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="h-[52px] bg-bondis-green mt-8 rounded-full justify-center items-center"
            >
              <Text className="font-inter-bold text-base">
                Salvar alterações
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableWithoutFeedback onPress={handleClosePress}>
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={snapPoints}
              index={-1}
              enablePanDownToClose
              backgroundStyle={{
                borderRadius: 20,
              }}
            >
              <BottomSheetView className="flex-1">
                <View className="mx-5 mb-8">
                  <TouchableOpacity
                    onPress={() => {
                      setGender("Homem");
                      handleClosePress();
                    }}
                    className="h-[51px] justify-center items-center border-b-[0.2px] border-b-gray-400"
                  >
                    <Text>Homem</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setGender("Mulher");
                      handleClosePress();
                    }}
                    className="h-[51px] justify-center items-center border-b-[0.2px] border-b-gray-400"
                  >
                    <Text>Mulher</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setGender("Não binario");
                      handleClosePress();
                    }}
                    className="h-[51px] justify-center items-center border-b-[0.2px] border-b-gray-400"
                  >
                    <Text>Não binario</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setGender("Prefiro não responder");
                      handleClosePress();
                    }}
                    className="h-[51px] justify-center items-center"
                  >
                    <Text>Prefiro não responder</Text>
                  </TouchableOpacity>
                </View>
              </BottomSheetView>
            </BottomSheet>
          </TouchableWithoutFeedback>

          <BottomSheet
            ref={bottomSheetRef2}
            snapPoints={snapPoints}
            index={-1}
            enablePanDownToClose
            backgroundStyle={{
              borderRadius: 20,
            }}
          >
            <BottomSheetView className="flex-1">
              <View className="mx-5 mb-8">
                <TouchableOpacity
                  onPress={() => {
                    setSports("Corrida");
                    handleClosePress();
                  }}
                  className="h-[51px] justify-center items-center border-b-[0.2px] border-b-gray-400"
                >
                  <Text>Corrida</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSports("Ciclismo");
                    handleClosePress();
                  }}
                  className="h-[51px] justify-center items-center"
                >
                  <Text>Ciclismo</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheet>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
