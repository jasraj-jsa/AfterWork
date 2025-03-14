import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const CreateEventLayout = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="login" options={{ headerShown: false }} />
				<Stack.Screen name="otp" options={{ headerShown: false }} />
			</Stack>
			<StatusBar backgroundColor="#161622" style="light" />
		</>
	);
};

export default CreateEventLayout;
