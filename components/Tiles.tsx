import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface TileProps {
	imageUrl: string;
	number: number;
	title: string;
}

const Tile: React.FC<TileProps> = ({ imageUrl, number, title }) => {
	return (
		<View className="overflow-hidden shadow-lg w-52 pb-12 pl-8">
			<Image
				source={{
					uri: imageUrl,
				}}
				className="w-full h-72 rounded-lg"
				style={{ resizeMode: "cover" }}
			/>
			<View className="absolute bottom-2">
				<Text className=" text-white font-bold text-9xl">{number}</Text>
			</View>
			<View className="absolute bottom-0 left-10 justify-center item-center">
				<Text className=" text-white font-bold text-md">{title}</Text>
			</View>
		</View>
	);
};

export default Tile;
