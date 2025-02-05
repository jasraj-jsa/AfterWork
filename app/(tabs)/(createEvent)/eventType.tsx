import CustomButton from "@/components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function eventType() {
	const goBack = () => router.back();
	return (
		<SafeAreaView className="bg-primary h-full">
			<View className="p-4 items-center">
				<TouchableOpacity
					activeOpacity={0.7}
					className="rounded-full p-2 bg-blue-900 float-left absolute left-0 ml-2"
					onPress={goBack}
				>
					<Text>
						<Ionicons name="arrow-back" size={24} color="white" />
					</Text>
				</TouchableOpacity>
				<View className="items-center">
					<Text className="text-xl text-white p-2">Schedule an Event</Text>
				</View>
				<View>
					<CustomButton
						title="For organizers"
						containerStyles="mt-7 p-4"
						handlePress={() => router.push("(customEvent)/home")}
					/>
					<CustomButton
						title="For users"
						containerStyles="mt-7 p-4"
						handlePress={() => router.push("(eventSelection)/home")}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
