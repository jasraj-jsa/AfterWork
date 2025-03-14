import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { PaperProvider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<PaperProvider
			settings={{
				icon: (props: any) => <Ionicons {...props} />,
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
					name="(createEvent)"
					options={{
						title: "Schedule",
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
					name="fam"
					options={{
						title: "Fam",
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
					name="bucketlist"
					options={{
						title: "Bucket List",
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
			<StatusBar backgroundColor="#161622" style="light" />
		</PaperProvider>
	);
}
