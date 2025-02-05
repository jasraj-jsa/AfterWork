import React, { useState } from "react";
import {
	View,
	ScrollView,
	TouchableOpacity,
	Text,
	Image,
	Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton, Switch } from "react-native-paper";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const FriendsScreen = ({
	modalValue,
	setModalValue,
	friendsData,
}: {
	modalValue: any;
	setModalValue: any;
	friendsData: any;
}) => {
	const [friends, setFriends] = useState(friendsData);

	const [expandedFriend, setExpandedFriend] = useState<number | null>(null);

	const theme = {
		bg: "bg-primary",
		text: "text-white",
		card: "bg-black-200",
		border: "border-black-100",
		secondary: "text-secondary-100",
	};

	const updatePrivacySetting = (
		friendId: number,
		setting: string,
		value: boolean
	) => {
		setFriends((prev: any) =>
			prev.map((friend: any) => {
				if (friend.id === friendId) {
					return {
						...friend,
						shared: {
							...friend.shared,
							[setting]: value,
						},
					};
				}
				return friend;
			})
		);
	};

	const FriendPrivacyCard = ({
		friend,
		isExpanded,
	}: {
		friend: any;
		isExpanded: boolean;
	}) => (
		<View className={`${theme.card} rounded-xl p-4 mb-3`}>
			<TouchableOpacity
				className="flex-row justify-between items-center"
				onPress={() => setExpandedFriend(isExpanded ? null : friend.id)}
			>
				<View className="flex-row items-center space-x-3">
					<View className="w-10 h-10 bg-white rounded-full items-center justify-center">
						<MaterialCommunityIcons name="account" size={24} color="#2563eb" />
					</View>
					<Text className={`${theme.text} font-psemibold text-lg`}>
						{friend.name}
					</Text>
				</View>
				<Ionicons
					name={isExpanded ? "chevron-up" : "chevron-down"}
					size={24}
					color="#2563eb"
				/>
			</TouchableOpacity>

			{isExpanded && (
				<View className="mt-4">
					<View className="flex-row justify-between items-center py-2 border-b border-black-100">
						<Text className={`${theme.text} font-pregular`}>
							Share Location
						</Text>
						<Switch
							value={friend.shared.location}
							onValueChange={(value) =>
								updatePrivacySetting(friend.id, "location", value)
							}
							color="#2563eb"
						/>
					</View>

					<View className="flex-row justify-between items-center py-2 border-b border-black-100">
						<Text className={`${theme.text} font-pregular`}>Share Events</Text>
						<Switch
							value={friend.shared.events}
							onValueChange={(value) =>
								updatePrivacySetting(friend.id, "events", value)
							}
							color="#2563eb"
						/>
					</View>

					<View className="flex-row justify-between items-center py-2 border-b border-black-100">
						<Text className={`${theme.text} font-pregular`}>
							Share Calendar
						</Text>
						<Switch
							value={friend.shared.calendar}
							onValueChange={(value) =>
								updatePrivacySetting(friend.id, "calendar", value)
							}
							color="#2563eb"
						/>
					</View>

					<View className="flex-row justify-between items-center py-2">
						<Text className={`${theme.text} font-pregular`}>
							Share Bucketlist
						</Text>
						<Switch
							value={friend.shared.bucketlist}
							onValueChange={(value) =>
								updatePrivacySetting(friend.id, "bucketlist", value)
							}
							color="#2563eb"
						/>
					</View>
				</View>
			)}
		</View>
	);

	return (
		<Modal visible={modalValue} animationType="slide">
			<SafeAreaView className={`flex-1 p-4 bg-primary`}>
				<ScrollView className="p-4 mt-8">
					{/* Header */}
					<View className="flex-row justify-between items-center mb-6">
						<Text className={`${theme.text} font-psemibold text-2xl`}>
							Friends
						</Text>
						<View className="flex-row items-center">
							{/* <TouchableOpacity
								className="p-2 bg-white rounded-full"
								onPress={() => router.push("/add-friends")}
							>
								<Ionicons name="person-add" size={24} color="#2563eb" />
							</TouchableOpacity> */}
							<IconButton
								icon="close"
								iconColor="#2563eb"
								onPress={() => setModalValue(false)}
							/>
						</View>
					</View>

					{/* Friends List */}
					{friends.map((friend: any) => (
						<FriendPrivacyCard
							key={friend.id}
							friend={friend}
							isExpanded={expandedFriend === friend.id}
						/>
					))}

					{/* Empty State */}
					{friends.length === 0 && (
						<View className="items-center justify-center mt-20">
							<Ionicons name="people" size={64} color="#2563eb" />
							<Text className={`${theme.text} font-pmedium text-lg mt-4`}>
								No friends added yet
							</Text>
							<Text
								className={`${theme.text} font-pregular text-center mt-2 px-8`}
							>
								Tap the + icon above to start connecting with friends
							</Text>
						</View>
					)}
				</ScrollView>
			</SafeAreaView>
		</Modal>
	);
};

export default FriendsScreen;
