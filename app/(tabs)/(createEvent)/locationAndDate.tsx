import {
	View,
	Text,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import FormComponent from "@/components/FormComponent";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";
import CustomRadioButton from "@/components/CustomRadioButton";

const locationAndDate = () => {
	const handleNext = () => router.push("/booking");
	const goBack = () => router.back();
	const handleCancel = () => router.dismissAll();
	const locationTypes = ["Physical", "Online"];
	const [locationType, setLocationType] = useState("Physical");
	const handleLocationTypeChange = (selectedOption: string) => {
		setLocationType(selectedOption);
	};
	return (
		<SafeAreaView className="bg-primary h-full">
			<View className="flex-row justify-center items-center space-x-3 ml-2 my-4">
				<TouchableOpacity
					className="rounded-full p-2 bg-blue-900 float-left absolute left-0"
					onPress={goBack}
				>
					<Text>
						<Ionicons name="arrow-back" size={24} color="white" />
					</Text>
				</TouchableOpacity>

				<Text className="text-xl text-white font-bold">Date & Venue</Text>
			</View>
			<ScrollView contentContainerStyle={{ padding: 20 }}>
				<View>
					<Text className="text-white font-semibold mb-2">Location</Text>
					<CustomRadioButton
						options={locationTypes}
						selectedOption={locationType}
						onSelect={handleLocationTypeChange}
					/>
				</View>
				<View className="mt-3">
					{locationType === "Physical" ? (
						<FormComponent placeholder="Sunburn Union Bangalore" />
					) : (
						<FormComponent placeholder="Link to the meeting" inputType="url" />
					)}
				</View>
				<View className="space-y-1">
					<Text className="text-white font-semibold">Date & Time</Text>
					<View className="flex-row items-center">
						<RNDateTimePicker
							mode="datetime"
							minimumDate={new Date()}
							value={new Date()}
							timeZoneName={"Asia/Calcutta"}
							display="spinner"
							textColor="white"
						/>
					</View>
				</View>
				<FormComponent
					label={`Duration\n(Optional)`}
					inputType="text"
					placeholder="3hrs"
					inputStyle="max-w-[100px]"
					direction="row"
				/>
				<View className="flex-row justify-end items-center space-x-3 mt-3">
					<TouchableOpacity
						className="border border-blue-700 rounded-lg py-3 px-4"
						onPress={handleCancel}
					>
						<Text className="text-white text-sm font-semibold">Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className="border rounded-lg bg-blue-700 py-3 px-6"
						onPress={handleNext}
					>
						<Text className="text-white text-sm font-semibold">Next</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default locationAndDate;
