import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	Image,
} from "react-native";
import React from "react";
import { router } from "expo-router";

const Home = () => {
	const getStarted = () => router.push("details");
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ padding: 20, alignItems: "center" }}>
				<Text className="text-white text-2xl font-bold">
					Bring Your Events to Life!
				</Text>
				<Text className="text-gray-300 text-lg mt-2">
					Craft Memorable Experiences Effortlessly.
				</Text>
				<Image
					source={{
						uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5EBGwzlILYoKG8k0mDAQOC-EebqlscsRcFA&s",
					}}
					className="w-[360px] h-[310px] mt-4 rounded-2xl"
					style={{ resizeMode: "cover" }}
				/>
				<TouchableOpacity
					className="mt-4 rounded-full bg-blue-900 p-4 min-w-full flex-row items-center justify-center"
					onPress={getStarted}
				>
					<Text className="text-white text-lg font-semibold">Get Started</Text>
				</TouchableOpacity>
				<View className="mt-6 items-center">
					<Text className="text-white text-lg font-bold">
						Benefits of Using Afterwork
					</Text>
					<View className="mt-2">
						<Text className="text-white text-base">
							1. Reach Your Audience: Tap into a vibrant community eager to
							discover new experiences.
						</Text>
						<Text className="text-white text-base mt-2">
							2. Easy Management: Simple and intuitive event management tools at
							your fingertips.
						</Text>
						<Text className="text-white text-base mt-2">
							3. Promotion: Get featured in our top events and reach a wider
							audience.
						</Text>
						<Text className="text-white text-base mt-2">
							4. Secure Payments: Seamlessly manage ticket sales and payments
							with our secure platform.
						</Text>
						<Text className="text-white text-base mt-2">
							5. Real-Time Updates: Keep your attendees informed with real-time
							notifications and updates.
						</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
