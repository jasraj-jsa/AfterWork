import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import FormComponent from "@/components/FormComponent";
import { router } from "expo-router";

const details = () => {
	const handleNext = () => router.push("/locationAndDate");
	return (
		<SafeAreaView className="bg-primary h-full">
			<View className="items-center">
				<Text className="text-xl text-white p-2">Event Details</Text>
			</View>
			<View className="p-4">
				<FormComponent
					label={"Event Title"}
					placeholder="Sunburn Arena Ft. Alan Walker - Bengaluru"
				/>
				<FormComponent
					label={"Event Description"}
					multiline={true}
					inputStyle="min-h-[80px]"
					placeholder={`Imagine nights where "Faded" isn't just a track, but the anthem of your memories, where every "Alone" moment feels like a shared pulse with thousands.

This tour is your playlist come to life. Feel the "Spectre" of beats haunting every corner of your mind, and when "Darkside" hits, that’s when you know it’s real – the music, the crowd, the energy.

Join the movement, feel the music, be the beat. Alan Walker is calling, and this is the journey you don’t wanna miss!

Book your Tickets Now!`}
				/>
				<FormComponent label={"Category"} placeholder="Concerts" />
				<View className="flex-row justify-end items-center space-x-3 mt-5">
					<TouchableOpacity className="border border-blue-700 rounded-lg py-3 px-4">
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

export default details;
