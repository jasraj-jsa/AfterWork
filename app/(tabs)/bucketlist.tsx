import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const BucketList = () => {
	return (
		<SafeAreaView className="bg-primary h-full">
			<View className="items-center">
				<Text className="text-xl text-white p-2">My Bucket List</Text>
			</View>
		</SafeAreaView>
	);
};

export default BucketList;
