import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonProps {
	title: string;
	handlePress: () => void;
	containerStyles?: string;
	textStyles?: string;
	isLoading: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	handlePress,
	containerStyles,
	textStyles,
	isLoading,
}) => {
	return (
		<TouchableOpacity
			className={`bg-blue-500 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
				isLoading ? "opacity-50" : ""
			}`}
			disabled={isLoading}
			activeOpacity={0.7}
			onPress={handlePress}
		>
			<Text className={`text-white font-psemibold text-lg ${textStyles}`}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
