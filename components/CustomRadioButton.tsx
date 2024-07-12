import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface CustomRadioButtonProps {
	options: string[];
	selectedOption: string;
	onSelect: (option: string) => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
	options,
	selectedOption,
	onSelect,
}) => {
	return (
		<View className="flex-row">
			{options.map((option, index) => (
				<TouchableOpacity
					key={index}
					className="flex-row items-center mr-4"
					onPress={() => onSelect(option)}
				>
					<View
						className={`w-4 h-4 rounded-full border-2 mr-2 ${
							selectedOption === option
								? "bg-blue-500 border-blue-500"
								: "border-gray-300"
						}`}
					/>
					<Text className="text-lg text-white">{option}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default CustomRadioButton;
