import { useMemo, useRef } from "react";
import { SafeAreaView, Text, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

export default function Bottom() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "100%"], []);

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-black flex-1">
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={0}
          backgroundStyle={{ backgroundColor: "#fff" }}
        >
          <View>
            <Text>oi</Text>
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
}
