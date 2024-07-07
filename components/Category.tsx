import { View, Text, Image } from "react-native";
import React from "react";

interface CategoryProps {
	imageUrl: string;
	category: string;
}

const Category: React.FC<CategoryProps> = ({ imageUrl, category }) => {
	return (
		<View className="w-28 space-y-1 justify-center items-start">
			<Image
				source={{
					uri: imageUrl,
				}}
				className="w-full h-28 rounded-xl"
				style={{ resizeMode: "cover" }}
			/>
			<Text className="text-white font-medium text-xs ml-2">{category}</Text>
		</View>
	);
};

export default Category;
