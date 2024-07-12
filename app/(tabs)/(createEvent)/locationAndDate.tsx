import {
	View,
	Text,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import FormComponent from "@/components/FormComponent";

const locationAndDate = () => {
	const handleNext = () => router.push("/booking");
	const goBack = () => router.back();
	const handleCancel = () => router.dismissAll();
	return (
		<SafeAreaView className="bg-primary h-full">
			<View className="p-2">
				<View className="flex-row justify-center items-center space-x-3">
					<TouchableOpacity
						className="rounded-full p-2 bg-blue-900 float-left absolute left-0"
						onPress={goBack}
					>
						<Text>
							<Ionicons name="arrow-back" size={24} color="white" />
						</Text>
					</TouchableOpacity>

					<Text className="text-xl text-white p-2">Date & Venue</Text>
				</View>
				<View className="items-center">
					<Text className="text-white font-semibold">Date</Text>
					<View className="flex-row items-center">
						<TextInput />
					</View>
				</View>
				<Text className="text-white font-semibold mb-2">Time</Text>
				<TextInput className="rounded-xl border mb-4 bg-gray-100 w-full" />
				<Text className="text-white font-semibold mb-2">Venue Location</Text>
				<TextInput className="rounded-xl border mb-4 bg-gray-100 w-full" />
				<Text className="text-white font-semibold mb-2">Event Poster</Text>
				<TextInput className="rounded-xl border mb-4 bg-gray-100 w-full" />
				<Text className="text-white font-semibold mb-2">Registration Link</Text>
				<TextInput className="rounded-xl border mb-4 bg-gray-100 w-full" />
				<Text className="text-white font-semibold mb-2">Price (optional)</Text>
				<TextInput className="rounded-xl border mb-4 bg-gray-100 w-full" />
				<View className="flex-row justify-end items-center space-x-3 mt-5">
					<TouchableOpacity
						className="border border-blue-700 rounded-lg py-3 px-4"
						onPress={handleCancel}
					>
						<Text className="text-white text-sm font-semibold">Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className="border rounded-lg bg-blue-700 py-3 px-6"
						onPress={handleNext}
					>
						<Text className="text-white text-sm font-semibold">Next</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default locationAndDate;
