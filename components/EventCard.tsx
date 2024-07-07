import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface EventCardProps {
	imageUrl: string;
	date: string;
	title: string;
	location: string;
	price?: string;
	bookingUrl?: string;
}

const EventCard: React.FC<EventCardProps> = ({
	imageUrl,
	date,
	title,
	location,
	price,
	bookingUrl,
}) => {
	const handlePress = () => {
		Linking.openURL(bookingUrl).catch((err) =>
			console.error("An error occurred", err)
		);
	};
	return (
		<TouchableOpacity
			className="rounded-2xl overflow-hidden shadow-lg bg-white w-60"
			activeOpacity={0.6}
			onPress={handlePress}
		>
			<View className="relative">
				<Image
					source={{
						uri: imageUrl,
					}}
					className="w-full h-40"
					style={{ resizeMode: "cover" }}
				/>
				<TouchableOpacity className="absolute top-2 right-2 bg-gray-600 opacity-60 p-2 rounded-full">
					<Ionicons name="heart-outline" size={22} color="white" />
				</TouchableOpacity>
				<View className="absolute bottom-2 left-2 bg-gray-600 rounded-2xl px-3 py-2 opacity-75">
					<Text className="text-white font-semibold text-xs">{date}</Text>
				</View>
			</View>
			<View className="px-2 py-1 mb-2 mr-1">
				<View className="flex-row justify-start items-start flex-1 space-x-4">
					<Text
						className="text-base font-bold flex-1"
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{title}
					</Text>
					{price ? (
						<Text className="text-red-500 text-base font-extrabold">
							{price}
						</Text>
					) : null}
				</View>
				<View className="flex-row justify-start items-center space-x-1">
					<Ionicons name="location-outline" size={14} color="#d14f38" />
					<Text className="text-gray-600 text-">{location}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default EventCard;
