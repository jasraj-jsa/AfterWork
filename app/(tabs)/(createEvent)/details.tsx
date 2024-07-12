import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import FormComponent from "@/components/FormComponent";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const details = () => {
	const handleNext = () => router.push("/locationAndDate");
	const goBack = () => router.back();
	const handleCancel = () => router.dismissAll();
	return (
		<SafeAreaView className="bg-primary h-full">
			<View className="flex-row justify-center items-center space-x-3 ml-2 my-4">
				<TouchableOpacity
					className="rounded-full p-2 bg-blue-900 float-left absolute left-0"
					onPress={goBack}
				>
					<Text>
						<Ionicons name="arrow-back" size={24} color="white" />
					</Text>
				</TouchableOpacity>
				<Text className="text-xl text-white p-2 font-bold">Event Details</Text>
			</View>
			<ScrollView contentContainerStyle={{ padding: 20 }}>
				<FormComponent
					label={"Event Title"}
					placeholder="Sunburn Arena Ft. Alan Walker - Bengaluru"
				/>
				<FormComponent label={"Category"} placeholder="Concerts" />
				<FormComponent
					label={"Event Description"}
					multiline={true}
					inputStyle="min-h-[80px]"
					placeholder={`This tour is your playlist come to life. Feel the "Spectre" of beats haunting every corner of your mind, and when "Darkside" hits, that’s when you know it’s real – the music, the crowd, the energy.\n
Book your Tickets Now!`}
				/>

				<FormComponent label="Event Poster" />

				<View className="flex-row justify-end items-center space-x-3 mt-3">
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
			</ScrollView>
		</SafeAreaView>
	);
};

export default details;
