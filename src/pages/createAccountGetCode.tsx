import { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Close from "../../assets/Close.svg";
import Logo from "../../assets/logo2.svg";
import Arrow from "../../assets/arrow-right.svg";
import Refresh from "../../assets/refresh.svg";
import { useNavigation } from "@react-navigation/native";

export default function CreateAccountGetCode({ route }: any) {
  const [timeLeft, setTimeLeft] = useState<number>(0); // Inicialmente 0
  const [isActive, setIsActive] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const navigation = useNavigation<any>();
  const { name, email } = route.params;
  const {  handleSubmit, control, formState: { errors }} = useForm<{code: string}>();  

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(timerId);
  }, [isActive, timeLeft, hasStarted]);


  useEffect(() => {
    sendMail()
    setTimeLeft(15); 
    setIsActive(true);
    setHasStarted(false);
  }, []);

  const startTimer = () => {
    setTimeLeft(20); 
    setIsActive(true);
    setHasStarted(true);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  function sendMail() {
    // console.log("requisição para enviar email");
    
     fetch("http://172.22.0.1:3000/sendmail", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
  }

  const onSubmit = async ({ code }: { code: string}) => {
    try {
      const response = await fetch("http://172.22.0.1:3000/confirmcode/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ code, email }),
      });
      const data: {message: string} = await response.json();

      if (!response.ok) {
        Alert.alert("Código invalido", "", [
          {
            text: "Ok",
            style: "cancel",
          },
        ]);

        throw new Error(`Código inválido, status ${response.status}`);
      }
      
      // console.log("codigo correto");     
      navigation.navigate("CreatePassword");

    } catch (error) {
      console.error(error);
    }
  };  
  

  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-[38px] pb-8">
      <View className="items-end mb-[10px]">
        <TouchableOpacity className="h-[43px] w-[43px] rounded-full bg-bondis-text-gray justify-center items-center">
          <Close />
        </TouchableOpacity>
      </View>

      <Logo />

      <Text className="text-2xl font-inter-bold mt-4">
        {name}, verifique seu e-mail
      </Text>

      <Text className="mt-4 text-bondis-gray-dark text-base">
        Um código de verificação foi enviado para:
      </Text>
      <Text className="text-[#1977F3] text-base">{email}</Text>

      <Text className="font-inter-bold text-base mt-8">Informe o código</Text>
      <Controller
        control={control}
        name="code"
        rules={{
          required: "Código obrigatório",
          minLength: {
            value: 6,
            message: "O código possui 6 digitos",
          }
        }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            placeholder="E-mail"
            value={value}
            autoCapitalize="none"
            onChangeText={onChange}
            className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"
          />
        )}
      />  
        {errors.code && (<Text className="mt-1 text-bondis-gray-dark">{String(errors?.code?.message)}</Text>)}

      { isActive && 
      <Text className="font-inter-bold text-base mt-8">
        Não recebeu o código?
      </Text>
      }

     { isActive ?     
      <Text className="mt-2 text-base">
        Aguarde <Text className="text-[#1977F3] text-base">{formatTime(timeLeft)}</Text> para
        reenviar
      </Text>
        :
      <TouchableOpacity  onPress={startTimer} disabled={isActive} className="flex-row items-center mt-8 gap-x-2" >
          <Refresh />
          <Text className="text-base underline font-inter-bold">Reenviar código</Text>
      </TouchableOpacity>
     }

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="h-[52px] flex-row bg-bondis-green mt-auto rounded-full justify-center items-center"
      >
        <Text className="font-inter-bold text-base">Proximo </Text>
        <Arrow />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

