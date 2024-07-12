import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CreateEventLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="home" options={{ headerShown: false }} />
			<Stack.Screen name="details" options={{ headerShown: false }} />
			<Stack.Screen name="locationAndDate" options={{ headerShown: false }} />
			<Stack.Screen name="booking" options={{ headerShown: false }} />
		</Stack>
	);
};

export default CreateEventLayout;
