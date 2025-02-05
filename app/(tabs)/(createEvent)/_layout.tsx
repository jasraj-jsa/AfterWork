import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const EventType = () => {
	return (
		<Stack>
			<Stack.Screen name="home" options={{ headerShown: false }} />
			<Stack.Screen name="eventType" options={{ headerShown: false }} />
			<Stack.Screen name="(customEvent)" options={{ headerShown: false }} />
			<Stack.Screen name="(eventSelection)" options={{ headerShown: false }} />
		</Stack>
	);
};

export default EventType;
