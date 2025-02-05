import React from "react";
import { Platform, Text, View } from "react-native";
import MapView, {
	Marker,
	PROVIDER_DEFAULT,
	PROVIDER_GOOGLE,
} from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { EVENTS } from "@/lib/mockData";

const EventHeatMap = ({ events }: { events: any }) => {
	// Calculate initial region
	const initialRegion = {
		latitude: events[0]?.location.latitude || 12.9716,
		longitude: events[0]?.location.longitude || 77.5946,
		latitudeDelta: 0.5,
		longitudeDelta: 0.5,
	};

	// Count occurrences of events per area
	const eventCounts: Record<string, number> = {};
	events.forEach((event: any) => {
		const area = event.area || "Unknown";
		eventCounts[area] = (eventCounts[area] || 0) + 1;
	});

	return (
		<View className="h-64 rounded-xl overflow-hidden border border-blue-600">
			<MapView
				provider={
					Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
				}
				className="flex-1"
				initialRegion={initialRegion}
				showsUserLocation={true}
				showsMyLocationButton={false}
				customMapStyle={[
					{
						featureType: "poi",
						stylers: [{ visibility: "off" }],
					},
				]}
			>
				{events.map((event: any) => (
					<Marker
						key={`event-${event.id}`}
						coordinate={{
							latitude: event.location.latitude,
							longitude: event.location.longitude,
						}}
					>
						<View className="p-2 rounded-full">
							<Ionicons name="location-sharp" size={20} color="#2563eb" />
						</View>
					</Marker>
				))}
			</MapView>

			{/* Legend Breakdown */}
			<View className="absolute bottom-2 right-2 bg-black-200 p-3 rounded-lg">
				<Text className="text-white font-psemibold mb-2">Event Breakdown</Text>
				{Object.entries(eventCounts).map(([area, count]) => (
					<View key={area} className="flex-row items-center mb-1">
						<View className="w-2 h-2 bg-[#2563eb] rounded-full mr-2" />
						<Text className="text-gray-100 text-sm">
							{area}: {count}
						</Text>
					</View>
				))}
			</View>
		</View>
	);
};

const FriendProfileCard = ({ friend }: { friend: any }) => {
	// Sample friend data
	const startIndex = (5 * (friend.id - 1)) % EVENTS.length;
	const friendEvents = EVENTS.slice(startIndex, startIndex + 5);

	return (
		<View className="bg-white rounded-xl p-4 mb-4">
			<View className="flex-row items-center mb-4">
				<View className="w-12 h-12 bg-[#2563eb] rounded-full items-center justify-center mr-3">
					<Text className="text-white font-psemibold">
						{friend.name.charAt(0)}
					</Text>
				</View>
				<View>
					<Text className="text-gray-700 font-psemibold text-lg">
						{friend.name}
					</Text>
					<Text className="text-gray-500 font-pregular text-sm">
						{friendEvents.length} recent events
					</Text>
				</View>
			</View>

			<EventHeatMap events={friendEvents} />

			<Text className="text-gray-500 mt-3 font-pregular">
				Event hotspots in last 30 days
			</Text>
		</View>
	);
};

export default FriendProfileCard;
