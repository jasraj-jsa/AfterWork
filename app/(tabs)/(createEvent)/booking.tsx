import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const booking = () => {
	const goBack = () => router.back();
	const handleCancel = () => router.dismissAll();
	return (
		<SafeAreaView className="bg-primary h-full">
			<View className="flex-row justify-center items-center space-x-3 mx-2">
				<TouchableOpacity
					className="rounded-full p-2 bg-blue-900 float-left absolute left-0"
					onPress={goBack}
				>
					<Text>
						<Ionicons name="arrow-back" size={24} color="white" />
					</Text>
				</TouchableOpacity>

				<Text className="text-xl text-white p-2">Booking Information</Text>
			</View>
			<View className="flex-row justify-end items-center space-x-3 mt-5">
				<TouchableOpacity
					className="border border-blue-700 rounded-lg py-3 px-4"
					onPress={handleCancel}
				>
					<Text className="text-white text-sm font-semibold">Cancel</Text>
				</TouchableOpacity>
				<TouchableOpacity className="border rounded-lg bg-blue-700 py-3 px-6">
					<Text className="text-white text-sm font-semibold">Submit</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default booking;
