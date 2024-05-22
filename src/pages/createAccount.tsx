import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import Close from "../../assets/Close.svg";
import Google from "../../assets/google.svg";
import Facebook from "../../assets/facebook.svg";
import Apple from "../../assets/apple.svg";
import Logo from "../../assets/logo2.svg";
import Arrow from "../../assets/arrow-right.svg";

type FormData = {
  name: string;
  email: string;
};

export default function CreateAccount() {
  const navigation = useNavigation<any>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async ({ name, email }: { name: string; email: string }) => {
    // console.log(name, email);
    navigation.navigate('GetCode', {
      name,
      email
    });
  };

  return (
    <SafeAreaView className="pt-[38px] px-5 bg-white flex-1">
      <View className="items-end mb-[10px]">
        <TouchableOpacity
          onPress={() => navigation.navigate("Intro")}
          className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center"
        >
          <Close />
        </TouchableOpacity>
      </View>

      <Logo />

      <Text className="font-inter-bold mt-4 text-2xl">Crie sua conta</Text>
      <Text className="text-[#565656] mt-4 text-base">
        Leva menos de 2 minutinhos 😃
      </Text>

      <Text className="font-inter-bold text-base mt-8">
        Como você se chama?
      </Text>
      <Controller
        control={control}
        name="name"
        rules={{
          required: "Nome obrigatório",
        }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value}
            autoCapitalize="none"
            onChangeText={onChange}
            className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"
          />
        )}
      />

      <Text className="mt-8 font-inter-bold text-base">E-mail</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email obrigatório",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email inválido",
          },
        }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"
            value={value}
            autoCapitalize="none"
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && (
        <Text className="mt-1 text-bondis-gray-dark">
          {String(errors?.email?.message)}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="h-[52px] flex-row bg-bondis-green mt-8 rounded-full justify-center items-center"
      >
        <Text className="font-inter-bold text-base">Proximo </Text>
        <Arrow />
      </TouchableOpacity>

      <Text className="text-center mt-8 text-base text-bondis-gray-dark">
        Ou entre em sua conta:
      </Text>

      <View className="flex-row mt-4 justify-center gap-x-7">
        <Google />
        <Facebook />
        <Apple />
      </View>
    </SafeAreaView>
  );
}
