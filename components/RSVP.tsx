import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	TextInput,
	ScrollView,
	Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export const EventRSVPModal = ({
	modalValue,
	event,
	onClose,
}: {
	modalValue: any;
	event: any;
	onClose: any;
}) => {
	const [rsvpStatus, setRsvpStatus] = useState("pending");
	const [showBucketList, setShowBucketList] = useState(false);
	const [message, setMessage] = useState("");
	const [selectedBucketItem, setSelectedBucketItem] = useState(null);

	// Theme configuration
	const theme = {
		bg: "bg-primary",
		text: "text-gray-700",
		card: "bg-white",
		border: "border-white-100",
		secondary: "text-[#2563eb]",
	};

	// Mock data
	const bucketList = [
		{
			id: 1,
			title: "Weekend Trek",
			location: "Nandi Hills",
			date: "Sat, Jun 15",
		},
		{
			id: 2,
			title: "Wine Tasting",
			location: "Big Banyan Vineyard",
			date: "Fri, Jun 21",
		},
	];

	const defaultEvent = {
		title: "Weekend BBQ Party",
		date: "Saturday, June 15",
		time: "4:00 PM - 7:00 PM",
		location: "Central Park, Whitefield",
		guests: [
			{ id: 1, name: "Sarah", status: "accepted" },
			{ id: 2, name: "Mike", status: "declined" },
			{ id: 3, name: "Emma", status: "pending" },
		],
		...event,
	};

	const handleSubmit = () => {
		// Handle submission logic
		onClose();
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
		<Modal transparent visible={modalValue} animationType="slide">
			<View className={`flex-1 bg-black/50 justify-center px-4`}>
				<View className={`${theme.card} rounded-xl p-4`}>
					<View className="flex-row justify-between items-center mb-4">
						<Text className={`${theme.text} font-psemibold text-xl`}>
							Event RSVP
						</Text>
						<TouchableOpacity onPress={onClose}>
							<Ionicons name="close" size={24} color="#2563eb" />
						</TouchableOpacity>
					</View>

					<ScrollView>
						{/* Event Details */}
						{event?.imageUrl && (
							<View className="pb-4">
								<Image
									source={{ uri: event.imageUrl }}
									className="w-full h-40 rounded-xl"
									style={{ resizeMode: "cover" }}
								/>
							</View>
						)}
						<View className="pb-4 border-b border-gray-100">
							<Text className={`${theme.text} font-psemibold text-lg mb-1`}>
								{defaultEvent.title}
							</Text>
							<View className="flex-row items-center my-1">
								<Ionicons name="calendar" size={16} color="#2563eb" />
								<Text className={`${theme.text} ml-2 font-pregular`}>
									{defaultEvent.date}
								</Text>
							</View>
							<View className="flex-row items-center my-1">
								<Ionicons name="time" size={16} color="#2563eb" />
								<Text className={`${theme.text} ml-2 font-pregular`}>
									{defaultEvent.time}
								</Text>
							</View>
							<View className="flex-row items-center mt-1">
								<Ionicons name="location" size={16} color="#2563eb" />
								<Text className={`${theme.text} ml-2 font-pregular`}>
									{defaultEvent.location}
								</Text>
							</View>
						</View>

						{/* Guest Avatars */}
						<View className="py-4 border-b border-gray-100">
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
										<Text className={`${theme.text} mt-1 text-xs`}>
											{guest.name}
										</Text>
									</View>
								))}
							</ScrollView>
						</View>

						{/* RSVP Actions */}
						<View className="flex-row justify-between py-4">
							{/* {["accept", "decline", "modify"].map((action) => (
								<TouchableOpacity
									key={action}
									className={`flex-1 items-center py-2 mx-1 rounded-lg ${
										rsvpStatus === action ? "bg-[#2563eb]" : "bg-black-100"
									}`}
									onPress={() => {
										setRsvpStatus(action);
										setShowBucketList(false);
									}}
								>
									<Ionicons
										name={
											action === "accept"
												? "checkmark-circle"
												: action === "decline"
												? "close-circle"
												: "calendar"
										}
										size={24}
										color={rsvpStatus === action ? "#161622" : "#2563eb"}
									/>
									<Text
										className={`${
											rsvpStatus === action ? "text-primary" : theme.text
										} mt-1 font-pmedium`}
									>
										{action.charAt(0).toUpperCase() + action.slice(1)}
									</Text>
								</TouchableOpacity>
							))} */}
							<View className="flex-row w-full justify-between">
								<TouchableOpacity
									className={`flex-1 items-center p-3 rounded-lg mr-2 ${
										rsvpStatus === "accepted"
											? "bg-green-500/20"
											: "border-2 border-gray-500"
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
									className={`flex-1 items-center p-3 rounded-lg mx-2 ${
										rsvpStatus === "declined"
											? "bg-red-500/20"
											: "border-2 border-gray-500"
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
									className={`flex-1 items-center p-3 rounded-lg ml-2 ${
										rsvpStatus === "modify"
											? "bg-blue-500/20"
											: "border-2 border-gray-500"
									}`}
									onPress={() => {
										setRsvpStatus("modify");
									}}
								>
									<MaterialCommunityIcons
										name="calendar-edit"
										size={20}
										color={rsvpStatus === "modify" ? "#3B82F6" : "#6B7280"}
									/>
									<Text
										className={`${
											rsvpStatus === "modify" ? "text-blue-500" : theme.text
										} font-pmedium mt-1`}
									>
										Modify
									</Text>
								</TouchableOpacity>
							</View>
						</View>

						{/* Additional Inputs Based on Selection */}
						{rsvpStatus === "declined" && (
							<View className="mb-4">
								<TextInput
									placeholder="Add optional message..."
									placeholderTextColor="#6B7280"
									className={`${theme.text} ${theme.card} rounded-lg p-3 font-pregular`}
									multiline
									value={message}
									onChangeText={setMessage}
								/>
							</View>
						)}

						{rsvpStatus === "modify" && (
							<View>
								<TouchableOpacity
									className={`${theme.card} p-3 rounded-lg mb-2 flex-row items-center`}
									onPress={() => setShowBucketList(!showBucketList)}
								>
									<MaterialCommunityIcons
										name="format-list-checks"
										size={20}
										color="#2563eb"
									/>
									<Text className={`${theme.text} ml-2 font-pmedium`}>
										{showBucketList
											? "Hide Bucket List"
											: "Choose from Bucket List"}
									</Text>
								</TouchableOpacity>

								{showBucketList && (
									<View className="mb-4">
										{bucketList.map((item) => (
											<TouchableOpacity
												key={item.id}
												className={`${theme.card} p-3 rounded-lg mb-2 ${
													selectedBucketItem?.id === item.id
														? "border border-[#2563eb]"
														: ""
												}`}
												onPress={() => setSelectedBucketItem(item)}
											>
												<Text className={`${theme.text} font-pmedium`}>
													{item.title}
												</Text>
												<Text className={`${theme.secondary} text-sm`}>
													{item.location}
												</Text>
												<Text className={`${theme.text} text-sm`}>
													{item.date}
												</Text>
											</TouchableOpacity>
										))}
									</View>
								)}

								<TextInput
									placeholder="Or suggest new date/time..."
									placeholderTextColor="#6B7280"
									className={`${theme.text} ${theme.card} rounded-lg p-3 font-pregular`}
									multiline
									value={
										selectedBucketItem
											? `Suggesting: ${selectedBucketItem.title}`
											: message
									}
									onChangeText={setMessage}
								/>
							</View>
						)}

						{/* Submit Button */}
						<TouchableOpacity
							className="bg-[#2563eb] rounded-lg p-3 mt-4 items-center"
							onPress={handleSubmit}
						>
							<Text className="text-white font-psemibold">Submit Response</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
};

// Compact Event Card
export const MyEventCard = ({
	event,
	onPress,
}: {
	event: any;
	onPress: any;
}) => {
	const theme = {
		card: "bg-white",
		text: "text-gray-700",
		secondary: "text-[#2563eb]",
	};

	return (
		<TouchableOpacity
			className={`${theme.card} rounded-xl p-3 mb-3`}
			onPress={onPress}
		>
			<Text className={`${theme.text} font-psemibold`}>{event.title}</Text>
			<View className="flex-row items-center mt-1">
				<Ionicons name="calendar" size={14} color="#2563eb" />
				<Text className={`${theme.secondary} ml-2 text-sm`}>{event.date}</Text>
			</View>
			<View className="flex-row items-center mt-1">
				<Ionicons name="location" size={14} color="#2563eb" />
				<Text className={`${theme.text} ml-2 text-sm`}>{event.location}</Text>
			</View>
		</TouchableOpacity>
	);
};

// Usage Example
// const EventScreen = () => {
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const sampleEvent = {
//     title: 'Birthday Celebration',
//     date: 'Friday, June 21',
//     time: '7:00 PM',
//     location: 'The Black Rabbit, Indiranagar'
//   };

//   return (
//     <View className="flex-1 bg-primary p-4">
//       <EventCard
//         event={sampleEvent}
//         onPress={() => setSelectedEvent(sampleEvent)}
//       />

//       {selectedEvent && (
//         <EventRSVPModal
//           event={selectedEvent}
//           onClose={() => setSelectedEvent(null)}
//         />
//       )}
//     </View>
//   );
// };
