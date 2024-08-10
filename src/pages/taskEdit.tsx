import { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import KilometerMeterPicker, {
  KilometerMeterPickerModalRef,
} from "../components/distancePicker";
import { useNavigation } from "@react-navigation/native";
import Outdoor from "../../assets/Outdoor.svg";
import Indoor from "../../assets/Indoor.svg";
import { LinearGradient } from "expo-linear-gradient";
import { cva } from "class-variance-authority";
import Down from "../../assets/down.svg";
import tokenExists from "../store/auth";
import Left from "../../assets/Icon-left.svg";
import { Data } from "./taskList";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { ptBR } from "../utils/localeCalendar";
import dayjs from 'dayjs';

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

interface Distance {
  kilometers: number;
  meters: number;
}

interface RouteParams {
  desafioId: number;
  desafioName: string;
  taskData: Data;
}

export default function TaskEdit({ route }: any) {
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
  const { desafioId, desafioName, taskData }: RouteParams = route.params;
  const childRef = useRef<KilometerMeterPickerModalRef>(null);
  const [day, setDay] = useState<DateData>({} as DateData);
  const [calendar, setCalendarVisible] = useState(false);
  const [initialDate, setInitialDate] = useState<string>();

  function closeModalDistance({ kilometers, meters }: Distance) {
    setDistance({ kilometers, meters });
    setModalVisible(false);
  }

  const ChangeDistancePicker = () => {
    if (childRef.current) {
      childRef.current.changeDistance(
        +taskData.distanceKm.split(".")[0],
        +taskData.distanceKm.split(".")[1]
          ? +taskData.distanceKm.split(".")[1]
          : 0
      );
    }
  };

  useEffect(() => {
    setActivityName(taskData.name);
    setDistance({
      kilometers: +taskData.distanceKm.split(".")[0],
      meters: +taskData.distanceKm.split(".")[1]
        ? +taskData.distanceKm.split(".")[1]
        : 0,
    });
    setCalories(taskData.calories.toString());
    setLocal(taskData.local!);
    setAmbience(taskData.environment);
    ChangeDistancePicker();
    setInitialDate(dayjs(taskData.date).format('YYYY-MM-DD'));

      if(initialDate) {
        
       setDay({ dateString: initialDate, day: +initialDate!.split("-")[2], month: +initialDate!.split("-")[1], year: +initialDate!.split("-")[0], timestamp: 0 });

      }
  }, []);

  function updateTaskData() {
    fetch(`http://172.22.0.1:3000/tasks/update-task/${taskData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: activityName,
        distanceKm: +`${distance.kilometers}.${distance.meters}`,
        environment: ambience,
        date: formatDateToISO(day),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        navigation.navigate("TaskList", { desafioId, desafioName });
      })
      .catch((error) => console.error(error));
  }

  const formatDateToISO = (date: DateData) => {
    if (!date.dateString) return null;

    const [year, month, day] = date.dateString.split('-').map(Number);
    const isoDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)); 

    const formattedDate = isoDate.toISOString().replace(/\.\d{3}Z$/, 'Z');

    return formattedDate;
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <ScrollView
        className=" flex-1"
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <View className="flex-row items-end h-[86px] pb-[14px]">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Left />
          </TouchableOpacity>
          <Text className="text-base font-inter-bold mx-auto ">
            Editar atividade
          </Text>
        </View>

        <Text className="font-inter-bold text-base mt-7">Nome</Text>

        <TextInput
          className="bg-bondis-text-gray rounded-[4px] h-[52px] mt-2 pl-4"
          value={activityName}
          onChangeText={setActivityName}
        />

        {activityName.length === 0 && (
          <Text className="mt-1 text-bondis-alert-red">Campo obrigatório</Text>
        )}

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
        <TouchableOpacity
          onPress={() => setCalendarVisible(true)}
          className="bg-bondis-text-gray rounded-[4px] h-[52px] flex-row mt-2 items-center justify-between pr-[22px] pl-4" 
        >
          <Text>{initialDate ? dayjs(initialDate).format('DD/MM/YYYY') : dayjs(day.dateString).format('DD/MM/YYYY') }</Text>
          <Down />
        </TouchableOpacity>
        <Modal
          transparent={true}
          visible={calendar}
          onRequestClose={() => setCalendarVisible(false)}
        >
          <Pressable style={{ flex: 1 }} onPress={() => setCalendarVisible(false)}>
            <View className="flex-1 justify-center items-center bg-black/50">
              <Pressable>
                <View className="bg-white p-6 rounded-lg shadow-lg w-80">
                  <Calendar
                    current=""
                    className="rounded-lg"
                    theme={{
                      todayTextColor: "#EB4335",
                      selectedDayTextColor: "black",
                      selectedDayBackgroundColor: "#12FF55",
                      arrowColor: "#12FF55",
                      textMonthFontWeight: "bold",
                    }}
                    onDayPress={(day: DateData) => {
                      setInitialDate("")
                      setDay(day);
                      setCalendarVisible(false);
                    }}
                    markedDates={{ [initialDate ? initialDate : day.dateString]: { selected: true } }}
                  />
                </View>
              </Pressable>
            </View>
          </Pressable>
        </Modal>

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
          onlyClose={setModalVisible}
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
        {distance.kilometers == 0 && distance.meters == 0 && (
          <Text className="mt-1 text-bondis-alert-red">Campo obrigatório</Text>
        )}

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

        <TouchableOpacity
          onPress={() => updateTaskData()}
          className={buttonDisabled({
            intent:
              activityName == "" ||
              (distance.kilometers == 0 && distance.meters == 0)
                ? "disabled"
                : null,
          })}
          disabled={
            activityName == "" ||
            (distance.kilometers == 0 && distance.meters == 0)
          }
        >
          <Text className="font-inter-bold text-base">Cadastrar atividade</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

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

const buttonDisabled = cva(
  "h-[52px] flex-row bg-bondis-green mt-8 mb-[32px] rounded-full justify-center items-center",
  {
    variants: {
      intent: {
        disabled: "opacity-50",
      },
    },
  }
);
