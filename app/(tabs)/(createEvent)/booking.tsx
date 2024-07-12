import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import FormComponent from "@/components/FormComponent";
import CustomRadioButton from "@/components/CustomRadioButton";

const booking = () => {
	const priceTypes = ["Fixed", "Onwards"];
	const [priceType, setPriceType] = useState("Fixed");
	const handlePriceTypeChange = (selectedOption: string) => {
		setPriceType(selectedOption);
	};
	const goBack = () => router.back();
	const handleCancel = () => router.dismissAll();
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

				<Text className="text-xl text-white font-bold">
					Booking Information
				</Text>
			</View>
			<ScrollView contentContainerStyle={{ padding: 20 }}>
				<FormComponent label="Booking Link" inputType="url" />
				<View className="flex-row items-center">
					<FormComponent
						label="Price (Optional)"
						inputType="numeric"
						placeholder="999"
						viewStyle="mr-4"
					/>
					<CustomRadioButton
						options={priceTypes}
						selectedOption={priceType}
						onSelect={handlePriceTypeChange}
					/>
				</View>
				<FormComponent
					label="Additional Details (Optional)"
					placeholder={`-> Age Restrictions (if any)\n-> COVID-19 Guidelines (if applicable)\n-> Special Instructions (e.g., Bring Your Own Equipment)`}
					multiline={true}
				/>
				<FormComponent
					label="Platform Requests (Optional)"
					placeholder={`Specify any platform requests that you may have and we will try our best to fulfill them.`}
					multiline={true}
				/>
				<View className="flex-row justify-end items-center space-x-3 mt-3">
					<TouchableOpacity
						className="border border-blue-700 rounded-lg py-3 px-4"
						onPress={handleCancel}
					>
						<Text className="text-white text-sm font-semibold">Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity className="border rounded-lg bg-blue-700 py-3 px-6">
						<Text className="text-white text-sm font-semibold">Submit</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default booking;
