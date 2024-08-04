import { useEffect, useState } from "react";
import tokenExists from "../store/auth";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import Left from "../../assets/Icon-left.svg";
import TaskItem from "../components/taskItem";

export type TasksData = Data[];
export interface Data {
  id: number;
  name: string;
  environment: string;
  date: null | Date;
  duration: null | string;
  calories: number;
  local: null | string;
  distanceKm: string;
  participationId: number;
  usersId: string;
}

export default function DesafioList({ route }: any) {
  const { desafioId, desafioName }: { desafioId: number; desafioName: string } =
    route.params;
  const token = tokenExists((state) => state.token);
  const [data, setData] = useState<TasksData>();

  useEffect(() => {
    fetch(`http://172.22.0.1:3000/tasks/get-tasks/${desafioId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json() as Promise<TasksData>)
      .then((data) => {
        // console.log(data)
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView overScrollMode="never" className="bg-[#F1F1F1] flex-1">
        <View className="bg-white mb-7">
          <View className="flex-row mt-[49.5] px-5 bg-white">
            <Left className="" />
            <Text className="text-base font-inter-bold mx-auto ">
              Atividades recentes
            </Text>
          </View>

          <View className="h-[60px] mt-4 pt-2 px-5 mb-7 bg-white">
            <Text className="text-sm text-bondis-gray-secondary">Desafio</Text>
            <Text className="text-base font-inter-bold mt-2">
              {desafioName}
            </Text>
          </View>
        </View>

        {data?.map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}
