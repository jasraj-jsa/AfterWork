import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { PaperProvider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<PaperProvider
			settings={{
				icon: (props) => <Ionicons {...props} />,
			}}
		>
			<Tabs
				screenOptions={{
					tabBarStyle: {
						backgroundColor: "#161622",
					},
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "home" : "home-outline"}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="explore"
					options={{
						title: "Explore",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "footsteps" : "footsteps-outline"}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="createEvent"
					options={{
						title: "Create",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "add-circle" : "add-circle-outline"}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="bookings"
					options={{
						title: "Bookings",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "ticket" : "ticket-outline"}
								color={color}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="favourites"
					options={{
						title: "Favourites",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? "heart" : "heart-outline"}
								color={color}
							/>
						),
					}}
				/>
			</Tabs>
		</PaperProvider>
	);
}
