import React, { useState } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	TextInput,
} from "react-native";
import {
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";

const EventRSVPCard = ({ event }: { event: any }) => {
	const [rsvpStatus, setRsvpStatus] = useState("pending");
	const [modifyVisible, setModifyVisible] = useState(false);
	const [suggestion, setSuggestion] = useState("");

	// Theme configuration
	const theme = {
		bg: "bg-primary",
		text: "text-gray-700",
		card: "bg-white",
		border: "border-white-100",
		secondary: "text-secondary-100",
	};

	// Mock event data structure
	const defaultEvent = {
		title: "Weekend BBQ Party",
		date: "Saturday, June 15",
		time: "4:00 PM - 7:00 PM",
		location: "Central Park, Whitefield",
		guests: [
			{ id: 1, name: "Sarah", status: "accepted" },
			{ id: 2, name: "Mike", status: "declined" },
			{ id: 3, name: "Emma", status: "pending" },
			{ id: 4, name: "John", status: "accepted" },
		],
		...event,
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "accepted":
				return "#10B981";
			case "declined":
				return "#EF4444";
			default:
				return "#6B7280";
		}
	};

	return (
		<View className={`${theme.card} rounded-xl p-4 mb-4`}>
			{/* Event Details */}
			<View className="pb-4 border-b border-black-100">
				<Text className={`${theme.text} font-psemibold text-lg mb-2`}>
					{defaultEvent.title}
				</Text>

				<View className="flex-row items-center mb-2">
					<Ionicons name="calendar" size={16} color="#2563eb" />
					<Text className={`${theme.text} ml-2 font-pregular`}>
						{defaultEvent.date}
					</Text>
				</View>

				<View className="flex-row items-center mb-2">
					<Ionicons name="time" size={16} color="#2563eb" />
					<Text className={`${theme.text} ml-2 font-pregular`}>
						{defaultEvent.time}
					</Text>
				</View>

				<View className="flex-row items-center">
					<Ionicons name="location" size={16} color="#2563eb" />
					<Text className={`${theme.text} ml-2 font-pregular`}>
						{defaultEvent.location}
					</Text>
				</View>
			</View>

			{/* Guest Avatars */}
			<View className="py-4 border-b border-black-100">
				<Text className={`${theme.text} font-pmedium mb-3`}>
					Guest Responses
				</Text>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{defaultEvent.guests.map((guest: any) => (
						<View key={guest.id} className="items-center mr-4">
							<View className="relative">
								<View className="w-12 h-12 bg-[#2563eb] rounded-full items-center justify-center">
									<Text className="font-pmedium text-white">
										{guest.name.charAt(0)}
									</Text>
								</View>
								<View className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
									<Ionicons
										name={
											guest.status === "accepted"
												? "checkmark-circle"
												: guest.status === "declined"
												? "close-circle"
												: "time"
										}
										size={20}
										color={getStatusColor(guest.status)}
									/>
								</View>
							</View>
							<Text className={`${theme.text} mt-1 text-xs`}>{guest.name}</Text>
						</View>
					))}
				</ScrollView>
			</View>

			{/* RSVP Actions */}
			<View className="pt-4">
				<View className="flex-row justify-between">
					<TouchableOpacity
						className={`flex-1 items-center py-2 rounded-lg mr-2 ${
							rsvpStatus === "accepted" ? "bg-green-500/20" : ""
						}`}
						onPress={() => setRsvpStatus("accepted")}
					>
						<Ionicons
							name="checkmark"
							size={20}
							color={rsvpStatus === "accepted" ? "#10B981" : "#6B7280"}
						/>
						<Text
							className={`${
								rsvpStatus === "accepted" ? "text-green-500" : theme.text
							} font-pmedium mt-1`}
						>
							Accept
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className={`flex-1 items-center py-2 rounded-lg mx-2 ${
							rsvpStatus === "declined" ? "bg-red-500/20" : ""
						}`}
						onPress={() => setRsvpStatus("declined")}
					>
						<Ionicons
							name="close"
							size={20}
							color={rsvpStatus === "declined" ? "#EF4444" : "#6B7280"}
						/>
						<Text
							className={`${
								rsvpStatus === "declined" ? "text-red-500" : theme.text
							} font-pmedium mt-1`}
						>
							Decline
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className={`flex-1 items-center py-2 rounded-lg ml-2 ${
							modifyVisible ? "bg-blue-500/20" : ""
						}`}
						onPress={() => {
							setModifyVisible(!modifyVisible);
							
						}}
					>
						<MaterialCommunityIcons
							name="calendar-edit"
							size={20}
							color={modifyVisible ? "#3B82F6" : "#6B7280"}
						/>
						<Text
							className={`${
								modifyVisible ? "text-blue-500" : theme.text
							} font-pmedium mt-1`}
						>
							Modify
						</Text>
					</TouchableOpacity>
				</View>

				{/* Modification Section */}
				{modifyVisible && (
					<View className="mt-4">
						<TextInput
							placeholder="Suggest new date/time..."
							placeholderTextColor="#6B7280"
							className={`${theme.text} ${theme.card} rounded-lg p-3 font-pregular`}
							value={suggestion}
							onChangeText={setSuggestion}
						/>
						<TouchableOpacity
							className="bg-secondary-100 rounded-lg p-3 mt-3 items-center"
							onPress={() => console.log("Suggestion:", suggestion)}
						>
							<Text className="text-primary font-psemibold">
								Send Modification Request
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
	);
};

export default EventRSVPCard;
