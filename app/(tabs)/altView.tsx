import React, { useState } from "react";
import {
	View,
	ScrollView,
	SafeAreaView,
	Dimensions,
	Platform,
} from "react-native";
import {
	Button,
	Text,
	Chip,
	Card,
	IconButton,
	TextInput,
	ProgressBar,
} from "react-native-paper";
import MapView, {
	Marker,
	PROVIDER_DEFAULT,
	PROVIDER_GOOGLE,
} from "react-native-maps";
import {
	MaterialIcons,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { EVENT_GENRES, EVENTS, FRIENDS } from "@/lib/mockData";

// Constants
const { width, height } = Dimensions.get("window");
const BANGALORE_COORDS = { latitude: 12.9716, longitude: 77.5946 };

// Mock Data

export default function CreateEventScreen() {
	const [step, setStep] = useState(0);
	const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
	const [selectedEvent, setSelectedEvent] = useState<any>(null);
	const [region, setRegion] = useState({
		...BANGALORE_COORDS,
		latitudeDelta: 0.5,
		longitudeDelta: 0.5,
	});

	// Zoom controls
	const handleZoom = (direction: "in" | "out") => {
		const factor = direction === "in" ? 0.5 : 2;
		setRegion((prev) => ({
			...prev,
			latitudeDelta: Math.max(0.01, prev.latitudeDelta * factor),
			longitudeDelta: Math.max(0.01, prev.longitudeDelta * factor),
		}));
	};

	// Genre selection
	const toggleGenre = (genreId: number) => {
		setSelectedGenres((prev) =>
			prev.includes(genreId)
				? prev.filter((id) => id !== genreId)
				: [...prev, genreId]
		);
	};

	// Filtered events based on selected genres
	const filteredEvents = EVENTS.filter(
		(event) =>
			selectedGenres.length === 0 ||
			selectedGenres.includes(
				EVENT_GENRES.find((g) => g.name === event.genre)?.id || 0
			)
	);

	return (
		<SafeAreaView className="flex-1 bg-gray-50">
			<ScrollView className="p-4">
				{/* Progress Header */}
				<View className="mb-8">
					<Text variant="headlineSmall" className="text-gray-900 mb-2">
						Create New Event
					</Text>
					<ProgressBar
						progress={(step + 1) / 3}
						color="#3b82f6"
						className="h-2 rounded-full"
					/>
					<View className="flex-row justify-between mt-2">
						{["Select Squad", "Choose Event", "Details"].map((label, index) => (
							<Text
								key={label}
								className={`text-sm ${
									index === step ? "text-blue-600 font-bold" : "text-gray-500"
								}`}
							>
								{label}
							</Text>
						))}
					</View>
				</View>

				{/* Step 1: Friend Selection */}
				{step === 0 && (
					<View>
						<Text variant="titleLarge" className="text-gray-900 mb-4">
							Who's joining?
						</Text>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{FRIENDS.map((friend) => (
								<Card
									key={friend.id}
									className={`mr-4 ${
										selectedFriends.includes(friend.id) ? "border-blue-500" : ""
									}`}
									mode="contained"
									style={{
										borderWidth: selectedFriends.includes(friend.id) ? 2 : 0,
										width: width * 0.35,
									}}
									onPress={() =>
										setSelectedFriends((prev) =>
											prev.includes(friend.id)
												? prev.filter((id) => id !== friend.id)
												: [...prev, friend.id]
										)
									}
								>
									<Card.Content className="items-center">
										<IconButton
											icon={
												selectedFriends.includes(friend.id)
													? "person"
													: "person-outline"
											}
											iconColor={
												selectedFriends.includes(friend.id)
													? "#3b82f6"
													: "#6b7280"
											}
											size={40}
										/>
										<Text className="text-gray-900 font-medium">
											{friend.name}
										</Text>
										<Text className="text-gray-500 text-sm">{friend.area}</Text>
									</Card.Content>
								</Card>
							))}
						</ScrollView>
					</View>
				)}

				{/* Step 2: Event Selection */}
				{step === 1 && (
					<View>
						<Text variant="titleLarge" className="text-gray-900 mb-4">
							Choose Event Type
						</Text>

						{/* Genre Chips */}
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							className="mb-4"
						>
							{EVENT_GENRES.map((genre) => (
								<Chip
									key={genre.id}
									selected={selectedGenres.includes(genre.id)}
									icon={genre.icon}
									style={{
										backgroundColor: selectedGenres.includes(genre.id)
											? genre.color
											: "#e5e7eb",
										marginRight: 8,
									}}
									textStyle={{
										color: selectedGenres.includes(genre.id)
											? "white"
											: "#374151",
									}}
									onPress={() => toggleGenre(genre.id)}
								>
									{genre.name}
								</Chip>
							))}
						</ScrollView>

						{/* Interactive Map */}
						<View className="h-96 rounded-2xl overflow-hidden border border-gray-200">
							<MapView
								provider={
									Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
								}
								className="flex-1"
								region={region}
								showsUserLocation={true}
								showsMyLocationButton={false}
							>
								{/* User Marker */}
								<Marker coordinate={BANGALORE_COORDS}>
									<View className="items-center">
										<MaterialCommunityIcons
											name="human-male"
											size={32}
											color="#3b82f6"
										/>
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
												<FontAwesome5
													name="user-friends"
													size={28}
													color="#10b981"
												/>
												<Text className="text-green-600 text-xs font-medium">
													{friend.name}
												</Text>
											</View>
										</Marker>
									)
								)}

								{/* Event Markers */}
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
											<Text
												className="text-xs font-medium"
												style={{
													color: EVENT_GENRES.find(
														(g) => g.name === event.genre
													)?.color,
												}}
											>
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
									containerColor="white"
									iconColor="#1f2937"
									size={24}
									onPress={() => handleZoom("in")}
								/>
								<IconButton
									icon="remove"
									mode="contained"
									containerColor="white"
									iconColor="#1f2937"
									size={24}
									onPress={() => handleZoom("out")}
								/>
							</View>
						</View>

						{/* Selected Event Preview */}
						{selectedEvent && (
							<Card className="mt-4 bg-blue-50 border border-blue-200">
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
											<Text className="text-lg font-semibold text-gray-900">
												{selectedEvent.title}
											</Text>
											<Text className="text-gray-600">
												{selectedEvent.venue}
											</Text>
										</View>
									</View>
								</Card.Content>
							</Card>
						)}
					</View>
				)}

				{/* Step 3: Event Details */}
				{step === 2 && selectedEvent && (
					<View>
						<Text variant="titleLarge" className="text-gray-900 mb-6">
							Final Details
						</Text>

						{/* Auto-filled Details */}
						<TextInput
							label="Event Title"
							value={selectedEvent.title}
							mode="outlined"
							className="mb-4"
							left={<TextInput.Icon icon="text" color="#6b7280" />}
						/>

						<View className="flex-row gap-4 mb-4">
							<TextInput
								label="Date"
								value={new Date(selectedEvent.date).toLocaleDateString()}
								mode="outlined"
								className="flex-1"
								left={<TextInput.Icon icon="calendar" color="#6b7280" />}
							/>
							<TextInput
								label="Time"
								value="7:00 PM"
								mode="outlined"
								className="flex-1"
								left={<TextInput.Icon icon="time" color="#6b7280" />}
							/>
						</View>

						<TextInput
							label="Location"
							value={selectedEvent.venue}
							mode="outlined"
							className="mb-4"
							left={<TextInput.Icon icon="location-sharp" color="#6b7280" />}
						/>

						{/* Guest Availability */}
						<Text className="text-gray-900 font-medium mb-2">
							Guest Availability
						</Text>
						<View className="flex-row flex-wrap gap-2">
							{FRIENDS.filter((f) => selectedFriends.includes(f.id)).map(
								(friend) => (
									<Chip
										key={friend.id}
										icon={
											friend.availability.includes(selectedEvent.date)
												? "checkmark"
												: "close"
										}
										textStyle={{
											color: friend.availability.includes(selectedEvent.date)
												? "#10b981"
												: "#ef4444",
										}}
										mode="outlined"
										style={{
											borderColor: friend.availability.includes(
												selectedEvent.date
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
				<View className="flex-row justify-between mt-5 mb-5">
					{step > 0 && (
						<Button
							mode="outlined"
							icon="arrow-back-outline"
							onPress={() => setStep((prev) => prev - 1)}
							textColor="#3b82f6"
						>
							Back
						</Button>
					)}

					<Button
						mode="contained"
						icon={
							step < 2 ? "arrow-forward-outline" : "checkmark-circle-outline"
						}
						onPress={() =>
							step < 2
								? setStep((prev) => prev + 1)
								: console.log("Create Event")
						}
						buttonColor={step < 2 ? "#3b82f6" : "#10b981"}
					>
						{step < 2 ? "Continue" : "Create Event"}
					</Button>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
