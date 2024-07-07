import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const createEvent = () => {
	return (
		<SafeAreaView className="bg-primary h-full">
			<View className="items-center">
				<Text className="text-xl text-white p-2">Create An Event</Text>
			</View>
		</SafeAreaView>
	);
};

export default createEvent;
