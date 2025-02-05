import React, { useState } from "react";
import {
	View,
	ScrollView,
	SafeAreaView,
	Dimensions,
	Modal,
	FlatList,
	TouchableOpacity,
	Platform,
} from "react-native";
import {
	Button,
	Text,
	Chip,
	Card,
	IconButton,
	TextInput,
	Switch,
	ProgressBar,
} from "react-native-paper";
import MapView, {
	Marker,
	PROVIDER_DEFAULT,
	PROVIDER_GOOGLE,
} from "react-native-maps";
import {
	FontAwesome5,
	FontAwesome6,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { EVENT_GENRES, EVENTS, FRIENDS } from "@/lib/mockData";
import { router } from "expo-router";
const BANGALORE_COORDS = { latitude: 12.9716, longitude: 77.5946 };

export default function CreateEventScreen() {
	const [step, setStep] = useState(0);
	const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
	const [selectedEvent, setSelectedEvent] = useState<any>(null);
	const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);
	const [isMapView, setIsMapView] = useState(true);
	const [showFriendsModal, setShowFriendsModal] = useState(false);
	const [eventData, setEventData] = useState({
		name: "",
		date: "",
		time: "",
		location: "",
	});
	const [filters, setFilters] = useState<{
		area: Array<string>;
		date: string;
		genre: Array<string>;
	}>({ area: [], date: "", genre: [] });
	const [region, setRegion] = useState({
		...BANGALORE_COORDS,
		latitudeDelta: 0.1,
		longitudeDelta: 0.1,
	});

	// Style helpers
	const theme = {
		bg: "bg-primary",
		text: "text-white",
		card: "bg-black-200",
		border: "border-black-100",
	};

	const goBack = () => {
		if (step == 0) return router.back();
		setStep((prev) => prev - 1);
	};

	// Filtered data
	const filteredEvents = EVENTS.filter(
		(e) =>
			(!filters.area.length || filters.area.includes(e.area)) &&
			(!filters.date || e.date === filters.date) &&
			(!filters.genre.length || filters.genre.includes(e.genre))
	);

	const visibleFriends = FRIENDS.slice(0, 5);

	// Map functions
	const handleZoom = (direction: "in" | "out") => {
		const factor = direction === "in" ? 0.5 : 2;
		setRegion((prev) => ({
			...prev,
			latitudeDelta: Math.max(0.01, prev.latitudeDelta * factor),
			longitudeDelta: Math.max(0.01, prev.longitudeDelta * factor),
		}));
	};

	const toggleGenre = (genreName: string) => {
		setSelectedGenres((prev) =>
			prev.includes(genreName)
				? prev.filter((id) => id !== genreName)
				: [...prev, genreName]
		);
		setFilters((prev) =>
			prev.genre.includes(genreName)
				? { ...prev, genre: prev.genre.filter((ele) => ele !== genreName) }
				: { ...prev, genre: [...prev.genre, genreName] }
		);
	};

	// Friend selection modal

	return (
		<SafeAreaView className={`flex-1 ${theme.bg}`}>
			<View className="p-4">
				<TouchableOpacity
					activeOpacity={0.7}
					className="rounded-full p-2 bg-blue-900 float-left absolute left-0"
					onPress={goBack}
				>
					<Text>
						<Ionicons name="arrow-back" size={24} color="white" />
					</Text>
				</TouchableOpacity>
				{/* Progress Header */}
				<View className="mb-6 mt-4">
					<Text
						className={`${theme.text} font-psemibold text-xl mb-3 text-center`}
					>
						Select an Event
					</Text>
					<ProgressBar
						progress={(step + 1) / 3}
						color="#2563eb"
						className="h-2 rounded-full"
					/>
					<View className="flex-row justify-between mt-3">
						{["Select Squad", "Choose Event", "Details"].map((label, index) => (
							<Text
								key={label}
								className={`font-pmedium ${
									index === step ? "text-white" : "text-gray-100/50"
								}`}
							>
								{label}
							</Text>
						))}
					</View>
				</View>
			</View>
			<ScrollView className="p-4">
				{/* Step 1: Friend Selection */}
				{step === 0 && (
					<View>
						<View className="flex-row justify-between items-center mb-4">
							<Text className={`${theme.text} font-pmedium text-lg`}>
								Select Friends
							</Text>
							<Button
								mode="text"
								textColor="white"
								onPress={() => setShowFriendsModal(true)}
							>
								View All
							</Button>
						</View>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{visibleFriends.map((friend) => (
								<Card
									key={friend.id}
									className={`mr-4 bg-white rounded-xl w-36 ${
										selectedFriends.includes(friend.id)
											? "border-[#2563eb] border-2"
											: ""
									}`}
									mode="contained"
									onPress={() =>
										setSelectedFriends((prev) =>
											prev.includes(friend.id)
												? prev.filter((id) => id !== friend.id)
												: [...prev, friend.id]
										)
									}
								>
									<Card.Content className="items-center">
										<Ionicons
											name={
												selectedFriends.includes(friend.id)
													? "person"
													: "person-outline"
											}
											size={40}
											color={
												selectedFriends.includes(friend.id)
													? "#2563eb"
													: "black"
											}
										/>
										<Text className={`text-black-100 font-psemibold mt-2`}>
											{friend.name}
										</Text>
										<Text className="text-blue-500 font-pregular text-sm">
											{friend.area}
										</Text>
									</Card.Content>
								</Card>
							))}
						</ScrollView>
					</View>
				)}

				{/* Step 2: Event Selection */}
				{step === 1 && (
					<View>
						<View className="flex-row justify-between items-center mb-4">
							<Text className={`${theme.text} font-pmedium text-lg`}>
								Find Events
							</Text>
							<View className="flex-row items-center">
								<Text className={`${theme.text} mr-2`}>Map View</Text>
								<Switch
									value={isMapView}
									onValueChange={setIsMapView}
									color="#2563eb"
								/>
							</View>
						</View>

						{/* Filters */}
						<ScrollView
							horizontal
							className="mb-4"
							showsHorizontalScrollIndicator={false}
						>
							{[
								"Whitefield",
								"Indiranagar",
								"Koramangala",
								"HSR Layout",
								"Jayanagar",
							].map((area) => (
								<Chip
									key={area}
									mode="outlined"
									className="mr-2"
									selected={filters.area.includes(area)}
									onPress={() =>
										setFilters((prev) =>
											prev.area.includes(area)
												? {
														...prev,
														area: prev.area.filter((ele) => ele !== area),
												  }
												: { ...prev, area: [...prev.area, area] }
										)
									}
									textStyle={{ color: "#2563eb" }}
								>
									{area}
								</Chip>
							))}
						</ScrollView>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							className="mb-4"
						>
							{EVENT_GENRES.map((genre) => (
								<Chip
									key={genre.id}
									selected={selectedGenres.includes(genre.name)}
									icon={genre.icon}
									style={{
										backgroundColor: selectedGenres.includes(genre.name)
											? genre.color
											: "#e5e7eb",
										marginRight: 8,
									}}
									textStyle={{
										color: selectedGenres.includes(genre.name)
											? "white"
											: "#374151",
									}}
									onPress={() => toggleGenre(genre.name)}
								>
									{genre.name}
								</Chip>
							))}
						</ScrollView>
						<View className="pb-2">
							<Button
								textColor="white"
								onPress={() => setSelectedEvent(null)}
								className="flex flex-row justify-end"
							>
								Clear Selection
							</Button>
						</View>

						{isMapView ? (
							<View className="h-96 rounded-2xl overflow-hidden border border-white">
								<MapView
									provider={
										Platform.OS === "android"
											? PROVIDER_GOOGLE
											: PROVIDER_DEFAULT
									}
									className="flex-1"
									region={region}
									showsUserLocation={true}
									showsMyLocationButton={false}
									customMapStyle={[
										{
											featureType: "poi",
											stylers: [{ visibility: "off" }],
										},
									]}
								>
									{/* My Marker */}
									<Marker coordinate={BANGALORE_COORDS}>
										<View className="items-center">
											<FontAwesome6 name="person" size={50} color="#3b82f6" />
											<Text className="text-blue-600 text-xs font-medium">
												You
											</Text>
										</View>
									</Marker>

									{/* Friends Markers */}
									{FRIENDS.filter((f) => selectedFriends.includes(f.id)).map(
										(friend) => (
											<Marker key={friend.id} coordinate={friend.location}>
												<View className="items-center">
													<FontAwesome6
														name="person"
														size={50}
														color="#10b981"
													/>
													<Text className="text-green-600 text-xs font-medium">
														{friend.name}
													</Text>
												</View>
											</Marker>
										)
									)}
									{/* Events Markers */}
									{filteredEvents.map((event) => (
										<Marker
											key={event.id}
											coordinate={event.location}
											onPress={() => setSelectedEvent(event)}
										>
											<View className="items-center">
												<MaterialIcons
													name="event-available"
													size={32}
													color={
														EVENT_GENRES.find((g) => g.name === event.genre)
															?.color
													}
												/>
												<Text className={`font-pmedium text-xs`}>
													{event.genre}
												</Text>
											</View>
										</Marker>
									))}
								</MapView>
								{/* Zoom Controls */}
								<View className="absolute right-2 top-2 gap-1">
									<IconButton
										icon="add"
										mode="contained"
										className="bg-[#2563eb]/60"
										iconColor="white"
										size={18}
										onPress={() => handleZoom("in")}
									/>
									<IconButton
										icon="remove"
										mode="contained"
										className="bg-[#2563eb]/60"
										iconColor="white"
										size={18}
										onPress={() => handleZoom("out")}
									/>
								</View>
							</View>
						) : (
							<FlatList
								data={filteredEvents}
								keyExtractor={(item) => item.id.toString()}
								scrollEnabled={false}
								renderItem={({ item }) => (
									<Card
										className={`bg-white mb-3 ${
											item === selectedEvent
												? "bg-blue-300 border-[#2563eb]"
												: ""
										}`}
										onPress={() => {
											setSelectedEvent(item);
											setStep((prev) => prev + 1);
										}}
										// onPress={() => {
										// 	setSelectedEvent(item);
										// 	setStep((prev) => prev + 1);
										// }}
									>
										<Card.Content>
											<Text className={`text-black font-psemibold`}>
												{item.title}
											</Text>
											<View className="flex-row items-center mt-2">
												<Ionicons name="location" size={16} color="#2563eb" />
												<Text className={`text-black ml-2`}>{item.area}</Text>
											</View>
										</Card.Content>
									</Card>
								)}
							/>
						)}
					</View>
				)}

				{/* Selected Event Preview */}
				{isMapView && step === 1 && selectedEvent && (
					<Card className="my-4 bg-white border border-[#2563eb]">
						<Card.Content>
							<View className="flex-row items-center">
								<MaterialIcons
									name="event-available"
									size={24}
									color={
										EVENT_GENRES.find((g) => g.name === selectedEvent.genre)
											?.color
									}
								/>
								<View className="ml-3">
									<Text className="text-lg font-psemibold text-gray-900">
										{selectedEvent.title}
									</Text>
									<Text className="text-gray-600 font-pregular">
										{selectedEvent.venue}
									</Text>
								</View>
							</View>
						</Card.Content>
					</Card>
				)}

				{/* Step 3: Event Details */}
				{step === 2 && (
					<View>
						<Text variant="titleLarge" className="text-white mb-6">
							Event Details
						</Text>

						{/* Auto-filled Details */}
						<View className="space-y-1">
							<Text className="text-white font-pmedium">Event</Text>
							<TextInput
								value={selectedEvent ? selectedEvent.title : eventData.name}
								mode="outlined"
								className="mb-4"
								left={<TextInput.Icon icon="text" color="#6b7280" />}
								onChangeText={(val) => {
									setEventData((prev) => ({ ...prev, name: val }));
								}}
								disabled={selectedEvent}
							/>
						</View>

						<View className="flex-row gap-8 mb-4">
							<View className="space-y-1">
								<Text className="text-white font-pmedium">Date</Text>
								<TextInput
									value={
										selectedEvent
											? new Date(selectedEvent.date).toLocaleDateString()
											: eventData.date
									}
									mode="outlined"
									className="flex-1"
									left={<TextInput.Icon icon="calendar" color="#6b7280" />}
									onChangeText={(val) => {
										setEventData((prev) => ({ ...prev, date: val }));
									}}
									disabled={selectedEvent}
								/>
							</View>
							<View className="space-y-1">
								<Text className="text-white font-pmedium">Time</Text>
								<TextInput
									value={selectedEvent ? "7:00 PM" : eventData.time}
									mode="outlined"
									className="flex-1"
									left={<TextInput.Icon icon="time" color="#6b7280" />}
									disabled={selectedEvent}
									onChangeText={(val) => {
										setEventData((prev) => ({ ...prev, time: val }));
									}}
								/>
							</View>
						</View>

						<View className="space-y-1">
							<Text className="text-white font-pmedium">Location</Text>
							<TextInput
								value={selectedEvent ? selectedEvent.venue : eventData.location}
								mode="outlined"
								className="mb-4 "
								left={<TextInput.Icon icon="location-sharp" color="#6b7280" />}
								disabled={selectedEvent}
								onChangeText={(val) => {
									setEventData((prev) => ({ ...prev, location: val }));
								}}
							/>
						</View>

						{/* Guest Availability */}
						<Text className="text-white font-pmedium mb-2">
							Guest Availability
						</Text>
						<View className="flex-row flex-wrap gap-2 mb-4">
							{FRIENDS.filter((f) => selectedFriends.includes(f.id)).map(
								(friend) => (
									<Chip
										key={friend.id}
										icon={
											friend.availability.includes(
												selectedEvent ? selectedEvent.date : eventData.date
											)
												? "checkmark"
												: "close"
										}
										textStyle={{
											color: friend.availability.includes(
												selectedEvent ? selectedEvent.date : eventData.date
											)
												? "#10b981"
												: "#ef4444",
										}}
										mode="outlined"
										style={{
											borderColor: friend.availability.includes(
												selectedEvent ? selectedEvent.date : eventData.date
											)
												? "#10b981"
												: "#ef4444",
										}}
									>
										{friend.name}
									</Chip>
								)
							)}
						</View>
					</View>
				)}

				{/* Navigation Controls */}
				<View className="flex-row justify-between mt-4 mb-6">
					{step > 0 && (
						<Button
							mode="contained"
							textColor="white"
							buttonColor="#2563eb"
							onPress={() => setStep((prev) => prev - 1)}
						>
							Back
						</Button>
					)}
					<Button
						mode="contained"
						buttonColor="#2563eb"
						textColor="white"
						onPress={() =>
							step < 2
								? setStep((prev) => prev + 1)
								: console.log("Create Event")
						}
					>
						{step < 2 ? "Continue" : "Create Event"}
					</Button>
				</View>
			</ScrollView>

			<Modal visible={showFriendsModal} animationType="slide">
				<SafeAreaView className={`flex-1 ${theme.bg} p-4`}>
					<View className="flex-row items-center justify-between mx-4">
						<Text className={`${theme.text} text-lg font-psemibold`}>
							Select Friends
						</Text>
						<IconButton
							icon="close"
							iconColor="#2563eb"
							onPress={() => setShowFriendsModal(false)}
						/>
					</View>
					<IconButton
						icon={
							selectedFriends.length === FRIENDS.length
								? "checkbox"
								: "square-outline"
						}
						iconColor="#2563eb"
						onPress={() =>
							selectedFriends.length === FRIENDS.length
								? setSelectedFriends([])
								: setSelectedFriends(FRIENDS.map((friend) => friend.id))
						}
					/>
					<FlatList
						data={FRIENDS}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<TouchableOpacity
								className={`p-3 mb-2 ${theme.card} rounded-lg`}
								onPress={() => {
									setSelectedFriends((prev) =>
										prev.includes(item.id)
											? prev.filter((id) => id !== item.id)
											: [...prev, item.id]
									);
								}}
							>
								<View className="flex-row items-center">
									<Ionicons
										name={
											selectedFriends.includes(item.id)
												? "checkbox"
												: "square-outline"
										}
										size={24}
										color="#2563eb"
									/>
									<Text className={`${theme.text} ml-3 font-pregular`}>
										{item.name}
									</Text>
								</View>
							</TouchableOpacity>
						)}
					/>
				</SafeAreaView>
			</Modal>
		</SafeAreaView>
	);
}
