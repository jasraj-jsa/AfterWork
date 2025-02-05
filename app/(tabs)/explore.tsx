
import {
	View,
	Text,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, FAB, Searchbar, Switch, TextInput } from "react-native-paper";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import Category from "@/components/Category";

export default function TabTwoScreen() {
	const [location, setLocation] = useState("Whitefield");
	const [search, setSearch] = useState("");

	return (
		<SafeAreaView className="bg-primary h-full">
			{/* <FAB icon="search" className="absolute right-0 bottom-0 m-5" /> */}
			<View className="flex-row justify-between items-center p-2">
				<View className="p-4 flex-row justify-start items-center">
					<Text className="text-white text-lg mr-2">{location}</Text>
					<AntDesign name="caretdown" size={13} color="white" />
				</View>
				<Button
					mode="outlined"
					className="border-orange-300 rounded-lg mr-2"
					textColor="white"
				>
					Suprise Me
				</Button>
			</View>
			<View className="justify-center items-center mt-2">
				<Text className="text-xl text-white font-bold">What's the plan?</Text>
			</View>
			<Searchbar
				placeholder="Go Clubbing"
				className="mt-4 mx-4 px-2"
				value={search}
				onChangeText={setSearch}
			/>
			<View className="flex-row justify-start items-center space-x-2 p-4 ml-2">
				<Button mode="elevated" className="rounded-full w-30">
					<Fontisto name="date" size={14} color="black" /> Date
				</Button>
				<Button mode="elevated" className="rounded-full w-30">
					<AntDesign name="filter" size={14} color="black" /> Filter
				</Button>
				<Button mode="elevated" className="rounded-full w-30">
					<AntDesign name="arrowdown" size={14} color="black" /> Sort
				</Button>
			</View>
			<ScrollView>
				<View className="items-start ml-5 mt-2">
					<Text className="text-white text-xl font-bold">
						Discover By Interest
					</Text>
					<View className="flex flex-row flex-wrap gap-x-3 gap-y-6 mt-0">
						<View>
							<Category
								category="AW Originals"
								imageUrl="https://images.pexels.com/photos/2541310/pexels-photo-2541310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
							/>
						</View>
						<View>
							<Category
								category="Theatre"
								imageUrl="https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
							/>
						</View>
						<View>
							<Category
								category="Painting"
								imageUrl="https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
							/>
						</View>
						<View>
							<Category
								category="Dancing"
								imageUrl="https://images.pexels.com/photos/5888633/pexels-photo-5888633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
							/>
						</View>
						<View>
							<Category
								category="Singing"
								imageUrl="https://images.pexels.com/photos/2531728/pexels-photo-2531728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
							/>
						</View>
						<View>
							<Category
								category="Go Karting"
								imageUrl="https://images.pexels.com/photos/861464/pexels-photo-861464.jpeg?auto=compress&cs=tinysrgb&w=800"
							/>
						</View>
						<View>
							<Category
								category="Trekking"
								imageUrl="https://images.pexels.com/photos/2450296/pexels-photo-2450296.jpeg?auto=compress&cs=tinysrgb&w=800"
							/>
						</View>
						<View>
							<Category
								category="Clubbing"
								imageUrl="https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
							/>
						</View>
						<View>
							<Category
								category="Art Exhibitions"
								imageUrl="https://images.pexels.com/photos/2123337/pexels-photo-2123337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
							/>
						</View>
						<View>
							<Category
								category="Movies"
								imageUrl="https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
							/>
						</View>
						<View>
							<Category
								category="Reading"
								imageUrl="https://images.pexels.com/photos/1031588/pexels-photo-1031588.jpeg?auto=compress&cs=tinysrgb&w=800"
							/>
						</View>
						<View>
							<Category
								category="Cycling"
								imageUrl="https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=800"
							/>
						</View>
					</View>
				</View>
				<View className="flex-wrap justify-start items-center space-x-2 p-4 ml-2">
					<Text className="text-white text-xl font-bold">
						Events for Every Mood
					</Text>
				</View>
				<View className="flex-wrap justify-start items-center space-x-2 p-4 ml-2">
					<Text className="text-white text-xl font-bold">Map Your Journey</Text>
				</View>
				<View className="flex-wrap justify-start items-center space-x-2 p-4 ml-2">
					<Text className="text-white text-xl font-bold">Upcoming Events</Text>
				</View>
				<View className="flex-wrap justify-start items-center space-x-2 p-4 ml-2">
					<Text className="text-white text-xl font-bold">Meet the Hosts</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
