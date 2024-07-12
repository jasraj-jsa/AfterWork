import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

interface CustomDropdownProps {
	options: Array<string>;
	selectedOption?: string;
	onSelect: any;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
	options,
	selectedOption,
	onSelect,
}) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleSelect = (option: string) => {
		onSelect(option);
		setIsDropdownOpen(false);
	};

	return (
		<View className="w-full border border-gray-300 rounded">
			<TouchableOpacity
				className="p-4 bg-white"
				onPress={() => setIsDropdownOpen(!isDropdownOpen)}
			>
				<Text className="text-lg">{selectedOption || "Select an option"}</Text>
			</TouchableOpacity>
			{isDropdownOpen && (
				<View className="bg-white border-t border-gray-300">
					<FlatList
						data={options}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<TouchableOpacity
								className="p-4"
								onPress={() => handleSelect(item)}
							>
								<Text className="text-lg">{item}</Text>
							</TouchableOpacity>
						)}
					/>
				</View>
			)}
		</View>
	);
};

export default CustomDropdown;
