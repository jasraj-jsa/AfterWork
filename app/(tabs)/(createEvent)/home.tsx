import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	Image,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Entypo, FontAwesome6, Octicons } from "@expo/vector-icons";

const Home = () => {
	const getStarted = () => router.push("details");
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
				<Text className="text-white text-2xl font-bold">
					Bring Your Events to Life!
				</Text>
				<Text className="text-gray-300 text-base">
					Craft Memorable Experiences Effortlessly.
				</Text>
				<Image
					source={require("@/assets/images/experiences.jpg")}
					className="w-[360px] h-[250px] mt-4 rounded-2xl"
					style={{ resizeMode: "cover" }}
				/>
				<TouchableOpacity
					className="mt-6 rounded-full bg-blue-500 p-4 min-w-full flex-row items-center justify-center"
					onPress={getStarted}
					activeOpacity={0.7}
				>
					<Text className="text-white text-lg font-psemibold">Get Started</Text>
				</TouchableOpacity>
				<View className="mt-8 items-center">
					<Text className="text-white text-xl font-bold">Why Afterwork?</Text>
					<View className="mt-4 space-y-8">
						<View className=" bg-[#1f2f5e] rounded-xl py-8 px-4 space-y-4 justify-center items-center">
							<Entypo name="modern-mic" size={40} color="white" />
							<Text className="text-white text-base font-medium">
								Reach a Broader Audience
							</Text>
						</View>
						<View className="bg-[#1f2f5e] rounded-xl py-8 px-4 space-y-4 justify-center items-center">
							<Octicons name="checklist" size={40} color="white" />
							<Text className="text-white text-base font-medium">
								Effortless Event Management
							</Text>
						</View>
						<View className="bg-[#1f2f5e] rounded-xl py-8 px-4 space-y-4 justify-center items-center">
							<FontAwesome6 name="users" size={40} color="white" />
							<Text className="text-white text-base font-medium">
								Boost Attendee Engagement
							</Text>
						</View>
						<View className="bg-[#1f2f5e] rounded-xl py-8 px-4 space-y-4 justify-center items-center">
							<FontAwesome6 name="paintbrush" size={40} color="white" />
							<Text className="text-white text-base font-medium">
								Tailor Your Event Experience
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
