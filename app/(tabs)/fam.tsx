import React, { useState } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	Modal,
	FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	MaterialCommunityIcons,
	Ionicons,
	FontAwesome5,
	MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { FRIENDS } from "@/lib/mockData";
import FriendsScreen from "@/components/FriendsScreen";
import { EventRSVPModal } from "@/components/RSVP";
import Contacts from "@/components/Contacts";
import FriendProfileCard from "@/components/EventHeatMap";

const MyFamScreen = () => {
	const [showFriendsModal, setShowFriendsModal] = useState(false);
	const [showAddFriendsModal, setShowAddFriendsModal] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const sampleEvent = {
		title: "Birthday Celebration",
		date: "Friday, June 21",
		time: "7:00 PM",
		location: "The Black Rabbit, Indiranagar",
	};
	// Mock data for events
	const myPlannedEvents = [
		{
			id: 1,
			title: "Coffee Catchup",
			friend: "Sarah Miller",
			location: "Blue Tokai, Whitefield",
			date: "Tomorrow, 10:00 AM",
			attendees: 2,
		},
		{
			id: 2,
			title: "Weekend Trek",
			friend: "Mike & 3 others",
			location: "Nandi Hills",
			date: "Sat, 6:00 AM",
			attendees: 4,
		},
	];

	const friendsPlannedEvents = [
		{
			id: 3,
			title: "Board Game Night",
			friend: "Alex Johnson",
			location: "Indiranagar",
			date: "Friday, 7:00 PM",
			attendees: 6,
			imageUrl:
				"https://api.venn.buzz/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTU5MTgsInB1ciI6ImJsb2JfaWQifX0=--989502ed835c66181e2be6ca8e731b882d342373/73f14e52-093e-40e6-bd9d-2e3edff08177",
		},
	];

	const EventCard = ({ event, onPress }: { event: any; onPress?: any }) => (
		<TouchableOpacity
			className="bg-white rounded-xl p-4 mb-3 shadow-sm"
			onPress={onPress}
		>
			<View className="flex-row justify-between items-start">
				<View className="flex-row items-center space-x-3">
					<View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
						<MaterialCommunityIcons
							name="account-group"
							size={24}
							color="#3b82f6"
						/>
					</View>
					<View>
						<Text className="text-lg font-psemibold text-gray-700">
							{event.title}
						</Text>
						<Text className="text-sm text-gray-500">{event.friend}</Text>
					</View>
				</View>
				<MaterialIcons name="chevron-right" size={24} color="#6b7280" />
			</View>

			<View className="mt-3 space-y-2">
				<View className="flex-row items-center space-x-2">
					<Ionicons name="location-outline" size={16} color="#6b7280" />
					<Text className="text-sm text-gray-600">{event.location}</Text>
				</View>
				<View className="flex-row items-center space-x-2">
					<MaterialCommunityIcons
						name="calendar-clock"
						size={16}
						color="#6b7280"
					/>
					<Text className="text-sm text-gray-600">{event.date}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView className="flex-1 bg-primary">
			<ScrollView className="flex-1 px-4">
				{/* Header */}
				<View className="flex-row justify-between items-center py-4">
					<Text className="text-2xl font-pbold text-white">My Fam</Text>
					<TouchableOpacity
						className="bg-blue-500 rounded-full p-2"
						onPress={() => setShowAddFriendsModal(true)}
					>
						<Ionicons name="person-add" size={24} color="white" />
					</TouchableOpacity>
				</View>

				{/* Quick Actions */}
				<View className="flex-row space-x-3 mb-6">
					<TouchableOpacity
						className="flex-1 bg-white rounded-xl p-4 items-center shadow-sm"
						onPress={() => router.push("(eventSelection)/home")}
					>
						<MaterialIcons
							name="add-circle-outline"
							size={24}
							color="#3b82f6"
						/>
						<Text className="mt-2 text-sm font-pmedium text-gray-700">
							Plan Event
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className="flex-1 bg-white rounded-xl p-4 items-center shadow-sm"
						onPress={() => setShowFriendsModal(true)}
					>
						<MaterialCommunityIcons
							name="account-group"
							size={24}
							color="#3b82f6"
						/>
						<Text className="mt-2 text-sm font-pmedium text-gray-700">
							View Friends
						</Text>
					</TouchableOpacity>
				</View>

				{/* My Planned Events */}
				<View className="mb-6">
					<Text className="text-lg font-psemibold text-white mb-3">
						My Planned Events
					</Text>
					{myPlannedEvents.map((event) => (
						<EventCard key={event.id} event={event} />
					))}
				</View>

				{/* Friends' Events */}
				<View className="mb-6">
					<Text className="text-lg font-psemibold text-white mb-3">
						Upcoming plans
					</Text>
					{friendsPlannedEvents.map((event) => (
						<EventCard
							key={event.id}
							event={event}
							onPress={() => setSelectedEvent(event as any)}
						/>

						// <MyEventCard
						// 	event={event}
						// 	key={event.id}
						// 	onPress={() => setSelectedEvent(event as any)}
						// />
					))}
					{selectedEvent && (
						<EventRSVPModal
							event={selectedEvent}
							modalValue={true}
							onClose={() => setSelectedEvent(null)}
						/>
					)}
				</View>
				<View>
				<Text className="text-lg font-psemibold text-white mb-3">What other's have been upto</Text>
				{FRIENDS.slice(0,3).map((friend) => (
					<FriendProfileCard key={friend.id} friend={friend} />
				))}
				</View>
			</ScrollView>
			{/* <Modal visible={showFriendsModal} animationType="slide"> */}
			{/* <SafeAreaView className={`flex-1 p-4 bg-primary`}> */}
			<FriendsScreen
				modalValue={showFriendsModal}
				setModalValue={setShowFriendsModal}
				friendsData={FRIENDS}
			/>
			<Contacts
				modalValue={showAddFriendsModal}
				setModalValue={setShowAddFriendsModal}
			/>

			{/* </SafeAreaView>
			</Modal> */}
		</SafeAreaView>
	);
};

export default MyFamScreen;
