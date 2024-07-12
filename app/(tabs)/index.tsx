import { useState } from "react";
import { Image, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import { Button, Searchbar } from "react-native-paper";
import EventCard from "@/components/EventCard";
import Tile from "@/components/Tiles";
import EventData from "../../lib/data";

export default function HomeScreen() {
	const [location, setLocation] = useState("Whitefield");
	const [time, setTime] = useState("Now");
	const [search, setSearch] = useState("");
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="flex-row justify-between items-center p-2">
					<View className="p-4 flex-row justify-start items-center">
						<Text className="text-white text-lg mr-2">{location}</Text>
						<AntDesign name="caretdown" size={13} color="white" />
					</View>
					<View className="mr-4">
						<Image
							source={{
								uri: "https://media.licdn.com/dms/image/D5603AQGO4R0xvBV4FA/profile-displayphoto-shrink_200_200/0/1693730389404?e=2147483647&v=beta&t=uRuNCpv50EcGrtraIK-98WZ4pzYQ83n1L_1RDHEOCOs",
							}}
							className="h-12 w-12 rounded-full"
						/>
					</View>
				</View>
				<Searchbar
					placeholder="Search for events"
					className="mt-1 px-2 mx-4"
					value={search}
					onChangeText={setSearch}
					right={(props) => (
						<Button mode="contained" className="rounded-full bg-gray-300">
							<AntDesign name="filter" size={16} color="black" />
						</Button>
					)}
				/>
				<View className="mt-4 p-4">
					<Text className="text-white text-xl font-bold">Just For You</Text>
					<ScrollView
						horizontal={true}
						className="mt-4"
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ justifyContent: "space-evenly", gap: 20 }}
					>
						<EventCard
							imageUrl="https://www.billboard.com/wp-content/uploads/2023/06/Fred-again-2022-live-billboard-1548.jpg?w=942&h=623&crop=1"
							title="Fred Again Tour"
							location="Whitefield"
							price="4,999+"
							date="23-26 Aug"
						/>
						<EventCard
							imageUrl="https://i0.wp.com/www.salsavida.com/wp-content/uploads/2023/01/latin-dancers-tango.jpg?fit=2000%2C1418&ssl=1"
							title="Salsa Workshop"
							location="Indiranagar"
							price="999+"
							date="5th Aug"
						/>
						<EventCard
							imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQNHc2aWMD3CsBX0Cm3PoGSF_7SJHLEbZ5XA&s"
							title="Yoga Retreat"
							location="JP Nagar"
							price="399"
							date="21st Aug"
						/>
					</ScrollView>
				</View>

				<View className="p-4">
					<Text className="text-white text-xl font-bold">
						Top Picks in {location}
					</Text>
					<ScrollView
						horizontal={true}
						className="mt-4"
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ justifyContent: "space-evenly", gap: 5 }}
					>
						<Tile
							title="Martin Garrix India Tour"
							imageUrl="https://images.indianexpress.com/2023/03/martin-garrix.jpg"
							number={1}
						/>
						<Tile
							title="Formula 1 Exhibition"
							imageUrl="https://img.freepik.com/premium-photo/f1-cars-futuristic-city-night-race-with-tire-smoke-sparks-with-futuristic-tall-buildings_952056-191.jpg"
							number={2}
						/>
						<Tile
							title="Trevor Noah Stand Up"
							imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkC9a9mZGJvcvFlXXR9VutCVx4TJGeVHuh4A&s"
							number={3}
						/>
					</ScrollView>
				</View>

				<View className="p-4">
					<View className="flex-row justify-between mx-2 items-center">
						<Text className="text-white text-xl font-bold">
							Happening Today
						</Text>
						<TouchableOpacity className="rounded-full bg-white p-2">
							<AntDesign name="arrowright" size={20} color="black" />
						</TouchableOpacity>
					</View>
					<ScrollView
						horizontal={true}
						className="mt-4"
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ justifyContent: "space-evenly", gap: 20 }}
					>
						{EventData.map((event, index) =>
							event["display_section"] === "day" ? (
								<EventCard
									key={index}
									imageUrl={event["small_image"]}
									title={event["title"]}
									location={event["venue"]["name"]}
									date={event["event_date"]}
									bookingUrl={event["shortened_link"]}
								/>
							) : null
						)}
					</ScrollView>
				</View>

				<View className="p-4">
					<View className="flex-row justify-between mx-2 items-center">
						<Text className="text-white text-xl font-bold">This Week</Text>
						<TouchableOpacity className="rounded-full bg-white p-2">
							<AntDesign name="arrowright" size={20} color="black" />
						</TouchableOpacity>
					</View>
					<ScrollView
						horizontal={true}
						className="mt-4"
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ justifyContent: "space-evenly", gap: 20 }}
					>
						{EventData.map((event, index) =>
							event["display_section"] === "later" ? (
								<EventCard
									key={index}
									imageUrl={event["small_image"]}
									title={event["title"]}
									location={event["venue"]["name"]}
									date={event["event_date"]}
									bookingUrl={event["shortened_link"]}
								/>
							) : null
						)}
					</ScrollView>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
