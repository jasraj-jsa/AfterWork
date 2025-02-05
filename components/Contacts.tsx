import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button, IconButton } from "react-native-paper";

const theme = {
	bg: "bg-primary",
	text: "text-white",
	card: "bg-black-200",
	border: "border-black-100",
	secondary: "text-secondary-100",
};

const pendingRequests = [
	{ id: 1, name: "Tony Stark" },
	{ id: 2, name: "Bruce Banner" },
];

const contacts = [
	{ id: 1, name: "Bruce Wayne", onPlatform: true },
	{ id: 2, name: "Alfred", onPlatform: true },
	{ id: 3, name: "Barry Allen", onPlatform: true },
	{ id: 4, name: "Oliver Queen", onPlatform: false },
	{ id: 5, name: "Clark Kent", onPlatform: false },
];

const Contacts = ({
	modalValue,
	setModalValue,
}: {
	modalValue: any;
	setModalValue: any;
}) => {
	return (
		<Modal visible={modalValue} animationType="slide">
			<SafeAreaView className={`flex-1 ${theme.bg} p-4`}>
				<ScrollView className="p-4 mt-8">
					<View className="flex-row justify-between mb-4">
						<Text className={`${theme.text} font-psemibold text-xl`}>
							Add Friends
						</Text>
						<TouchableOpacity onPress={() => setModalValue(false)}>
							<Ionicons name="close" size={24} color="#2563eb" />
						</TouchableOpacity>
					</View>

					<Text className={`${theme.text} font-pmedium mb-2`}>
						From your Contacts
					</Text>
					{contacts.map((contact) => (
						<View
							key={contact.id}
							className={`${theme.card} rounded-xl p-3 mb-2`}
						>
							<View className="flex-row justify-between items-center">
								<Text className={`${theme.text} font-pregular`}>
									{contact.name}
								</Text>
								<Button
									mode="contained"
									textColor="white"
									onPress={() => {}}
									className="bg-[#2563eb]"
								>
									{contact.onPlatform ? "Send Request" : "Invite"}
								</Button>
							</View>
						</View>
					))}

					<Text className={`${theme.text} font-pmedium my-2`}>
						Pending Requests
					</Text>
					{pendingRequests.map((contact) => (
						<View
							key={contact.id}
							className={`${theme.card} rounded-xl p-3 mb-2`}
						>
							<View className="flex-row justify-between items-center">
								<Text className={`${theme.text} font-pregular`}>
									{contact.name}
								</Text>
								<View className="flex flex-row">
									<IconButton
										icon="checkmark"
										onPress={() => {}}
										iconColor="white"
										className="border-green-200 border-2"
									/>
									<IconButton
										icon="close"
										onPress={() => {}}
										iconColor="white"
										className="border-red-200 border-2"
									/>
								</View>
							</View>
						</View>
					))}
				</ScrollView>
			</SafeAreaView>
		</Modal>
	);
};

export default Contacts;
