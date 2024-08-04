import { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import KilometerMeterPicker, { KilometerMeterPickerModalRef } from "../components/distancePicker";
import Left from "../../assets/arrow-left.svg";
import { useNavigation } from "@react-navigation/native";
import Outdoor from "../../assets/Outdoor.svg";
import Indoor from "../../assets/Indoor.svg";
import { LinearGradient } from "expo-linear-gradient";
import { cva } from "class-variance-authority";
import Down from "../../assets/down.svg";
import tokenExists from "../store/auth";

const ambienceType = cva(
  "h-[37px] rounded-full justify-center items-center flex-row gap-x-[8px] border-[1px] border-[#D9D9D9] pr-4 pl-2",
  {
    variants: {
      intent: {
        livre: "border-0",
        esteira: "border-0",
      },
    },
  }
);

const buttonDisabled = cva("h-[52px] flex-row bg-bondis-green mt-8 mb-[32px] rounded-full justify-center items-center", {
  variants: {
    intent: {
      disabled: "opacity-50",
    },
  },
});

interface Distance {
  kilometers: number;
  meters: number;
}

export default function DesafioEdit({ route }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [ambience, setAmbience] = useState("livre");
  const [distance, setDistance] = useState<{
    kilometers: number;
    meters: number;
  }>({ kilometers: 0, meters: 0 });
  const [activityName, setActivityName] = useState("");
  const [calories, setCalories] = useState("");
  const [local, setLocal] = useState("");
  const navigation = useNavigation<any>();
  const token = tokenExists((state) => state.token);
  const { desafioId, desafioName, pageType }: { desafioId: number, desafioName: string, pageType: string } = route.params;
  const childRef = useRef<KilometerMeterPickerModalRef>(null);

  function closeModalDistance({ kilometers, meters }: Distance) {
    setDistance({ kilometers, meters });
    setModalVisible(false);
  }

  const handleClearDistance = () => {
    if (childRef.current) {
      childRef.current.clearDistance();
    }
  };

  function updateTaskData() {
  fetch('http://172.22.0.1:3000/tasks/update-task/40', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
       "name": activityName,
       "distanceKm": +`${distance.kilometers}.${distance.meters}`,
       "environment": ambience
     })
  })
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.error(error));
  }

  function createTask() { 
    fetch('http://172.22.0.1:3000/tasks/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
         "name": activityName,
         "distance": +`${distance.kilometers}.${distance.meters}`,
         "environment": ambience,
         "calories": +calories,
         "participationId": desafioId
       })
    })
    .then(response => response.json())
    .then(json => {
      clearInputs()
      navigation.navigate("DesafioList", {desafioId, desafioName})
    })
    .catch(error => console.error(error));
  }

  function clearInputs() {
    setActivityName("")
    setDistance({ kilometers: 0, meters: 0 });
    setAmbience("livre");
    setCalories("");
    setLocal("");
    handleClearDistance();
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <ScrollView
        className=" flex-1"
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <View className="mb-[10px] pt-[38px]">
          <TouchableOpacity
            onPress={() => navigation.navigate("DesafioSelect")}
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

        <TextInput
          className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"
          value={activityName}
          onChangeText={setActivityName}
        />

        { activityName.length === 0 &&
          <Text className="mt-1 text-bondis-alert-red">
              Campo obrigatório
          </Text>
        }

        <Text className="font-inter-bold mt-7 text-base">Ambiente</Text>
        <View className="flex-row mt-4 gap-x-4 ml-[-8px]">
          <TouchableOpacity onPress={() => setAmbience("livre")}>
            <LinearGradient
              colors={[
                ambience === "livre" ? "rgba(178, 255, 115, 0.322)" : "#fff",
                ambience === "livre" ? "#12FF55" : "#fff",
              ]}
              className={ambienceType({
                intent: ambience === "livre" ? "livre" : null,
              })}
            >
              <Outdoor />
              <Text>Ao ar livre</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setAmbience("esteira")}>
            <LinearGradient
              colors={[
                ambience === "esteira" ? "rgba(178, 255, 115, 0.322)" : "#fff",
                ambience === "esteira" ? "#12FF55" : "#fff",
              ]}
              className={ambienceType({
                intent: ambience === "esteira" ? "esteira" : null,
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
          ref={childRef}
          visible={modalVisible}
          onClose={({ kilometers, meters }: Distance) =>
            closeModalDistance({ kilometers, meters })
          }
        />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 flex-row justify-between items-center pl-4 pr-[22px]"
        >
          <Text>
            {distance.kilometers}km {distance.meters}m
          </Text>
          <Down />
        </TouchableOpacity>
        { (distance.kilometers == 0 && distance.meters == 0) &&
          <Text className="mt-1 text-bondis-alert-red">
              Campo obrigatório
          </Text>
        }  

        <Text className="font-inter-bold text-base mt-7">
          Calorias queimadas
        </Text>
        <TextInput
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
          className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 items-end justify-center pr-[22px] pl-4"
        />

        <Text className="font-inter-bold text-base mt-7">Local</Text>
        <TextInput
          value={local}
          onChangeText={setLocal}
          className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 items-end justify-center pr-[22px] pl-4"
        />

        <TouchableOpacity onPress={() => createTask()} 
        className={buttonDisabled({
          intent: activityName == "" || (distance.kilometers == 0 && distance.meters == 0) ? "disabled" : null ,
        })}
        disabled={activityName == "" || (distance.kilometers == 0 && distance.meters == 0)}        
        >
          <Text className="font-inter-bold text-base">Cadastrar atividade</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
