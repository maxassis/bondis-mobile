import { View, Text, TouchableOpacity } from "react-native";
import Livre from "../../assets/livre.svg";
import Calendar from "../../assets/calendar.svg";
import Pin from "../../assets/map-pin.svg";
import Gear from "../../assets/settings-black.svg";
import Link from "../../assets/link.svg";
import { useNavigation } from "@react-navigation/native";

export interface TaskItemProps {
  id: number
  name: string
  environment: string
  date: Date | null
  duration: string | null
  calories: number
  local: string | null
  distanceKm: string
  participationId: number
  usersId: string
}

export default function TaskItem({ task }: { task: TaskItemProps }) {
    const navigation = useNavigation<any>();

    return(
        <View className="h-[165px] p-5 bg-white mb-4">
          <View className="flex-row w-full h-[42px]">
            <View className="h-[42px] flex-row">
              <Livre />
              <View className="ml-4 ">
                <Text className="text-base font-inter-bold">
                  {task.name}
                </Text>
                <View className="flex-row">
                  <View className="flex-row gap-x-1 items-center justify-center">
                    <Calendar />
                    <Text className="text-bondis-gray-dark text-xs">
                      Há 2 dias
                    </Text>
                  </View>
                  <View className="flex-row gap-x-1 items-center justify-center ml-4">
                    {task.local && <Pin />}
                    <Text className="text-bondis-gray-dark text-xs ml-4">
                      {task.local}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("TaskEdit", { desafioId: task.participationId, taskData: task })} className="ml-auto w-[40px] h-[32px] items-end">
              <Gear />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center gap-x-1 mt-3">
            <Link />
            <Text className="text-xs text-bondis-gray-dark">Sincronizado via Strava</Text>
          </View> 

          <View className="flex-row mt-3">
            <View className="w-[98px] h-[44px] border-l-2 border-[#D1D5DA] pl-2">
                <Text className="text-[18px] font-inter-bold">{task.distanceKm}</Text>
                <Text className="text-bondis-gray-dark text-[10px]">KM</Text>
            </View>
            <View className="w-[98px] h-[44px] border-l-2 border-[#D1D5DA] pl-2">
                <Text className="text-[18px] font-inter-bold">{task.duration}</Text>
                <Text className="text-bondis-gray-dark text-[10px]">DURAÇÃO</Text>
            </View>
            <View className="w-[98px] h-[44px] border-l-2 border-[#D1D5DA] pl-2">
                <Text className="text-[18px] font-inter-bold">{task.calories}</Text>
                <Text className="text-bondis-gray-dark text-[10px]">CAL</Text>
            </View>
          </View> 
        </View>
    )
}