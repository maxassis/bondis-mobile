import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Close from "../../assets/Close.svg";
import Logo from "../../assets/logo2.svg";
import { useForm, Controller } from "react-hook-form";

export default function Recovery() {
  const navigation = useNavigation<any>();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit = async ({ email }: { email: string }) => {
    navigation.navigate('RecoveryCode', {    
      email
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-[38px]">
      <View className="items-end mb-[10px]">
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center"
        >
          <Close />
        </TouchableOpacity>
      </View>

      <View className="h-[368px] pt-8">
        <Logo />

        <Text className="font-inter-bold text-2xl mt-4">
          Recupere seu acesso
        </Text>
        <Text className="text-bondis-gray-dark mt-4">
          Informe um e-mail válido para redefinir sua senha:
        </Text>

        <Text className="font-inter-bold text-base mt-8">E-mail</Text>
        {/* <TextInput className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4" />   */}
        <Controller
          control={control}
          name="email"
          rules={{
            required: "E-mail obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            }
          }}
          render={({ field: { value, onChange } }) => (
            <TextInput value={value} autoCapitalize="none" onChangeText={onChange} className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4" />  
          )}
        />
        {errors.email && (
        <Text className="mt-1 text-bondis-gray-dark">
          {String(errors?.email?.message)}
        </Text>
      )}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="h-[52px] bg-bondis-green mt-8 rounded-full justify-center items-center"
        >
          <Text className="font-inter-bold text-base">Recuperar senha</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
