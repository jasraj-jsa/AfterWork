import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const Home = () => {
	const handleGetStarted = () => {
		router.push("(tabs)");
	};
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-full justify-center items-center min-h-[85vh] px-4">
					<Image
						source={require("@/assets/images/Frame.png")}
						className="w-[230px] h-[184px]"
						resizeMode="contain"
					/>
					<View className="mt-5">
						<Text className="text-3xl text-white font-pbold text-center">
							Discover and enjoy local events with{" "}
							<Text className="text-blue-500">AfterWork</Text>
						</Text>
						<Text className="text-white font-pregular text-sm mt-5 text-center">
							Explore a world of vibrant local events, curated for your
							post-work adventures and weekend escapades.
						</Text>
						<CustomButton
							title="Get Started"
							isLoading={false}
							containerStyles="mt-7"
							handlePress={handleGetStarted}
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
