import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookings = () => {
	return (
		<SafeAreaView className="bg-primary h-full">
			<View className="items-center">
				<Text className="text-xl text-white p-2">Bookings</Text>
			</View>
		</SafeAreaView>
	);
};

export default Bookings;
