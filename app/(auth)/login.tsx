import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	Image,
	TextInput,
	TouchableOpacity,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { sendOtp } from "@/lib/appwrite";
import { router } from "expo-router";

const SignIn = () => {
	const [phoneNo, setPhoneNo] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const handlePhoneNoChange = (pnumber: string) => {
		if (/^\d*$/.test(pnumber)) {
			setPhoneNo(pnumber);
		}
	};
	const clearPhoneNo = () => {
		setPhoneNo("");
	};
	const submit = async () => {
		setIsLoading(true);

		if (/^\d*$/.test(phoneNo) && phoneNo.length === 10) {
			try {
				// const userId = await sendOtp(phoneNo);
				router.push({
					pathname: "otp",
					params: { phoneNo, userId: "12312312323" },
				});
			} catch (err: any) {
				Alert.alert("Request Failed", err);
			}
		}
		setIsLoading(false);
	};
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center px-4 my-6 min-h-[65vh]">
					<Image
						source={require("@/assets/images/Frame.png")}
						className="w-[140px] h-[94px]"
						resizeMode="contain"
					/>
					<Text className="my-6 text-5xl text-white font-psemibold py-2">
						Find, Join, Enjoy - Your Perfect{""}
						<Text className="text-blue-500"> Event Companion!</Text>
					</Text>
					<View className="flex-row justify-between items-center space-x-4 mx-2">
						<View className="border border-gray-400/70 flex-1"></View>
						<Text className="text-white font-pmedium text-base">
							Log in or sign up
						</Text>
						<View className="border border-gray-400/70 flex-1"></View>
					</View>
					<View className="flex-row justify-center items-center mt-5 pr-4 mx-4 bg-white rounded-xl border">
						<TextInput
							value="+91"
							className="rounded-xl bg-gray-50 p-4 text-[20px]"
							readOnly={true}
						/>

						<TextInput
							placeholder="Enter Mobile Number"
							className="rounded-xl bg-gray-50 p-4 flex-1 pl-0 text-[20px]"
							inputMode="tel"
							keyboardType="number-pad"
							maxLength={10}
							value={phoneNo}
							onChangeText={handlePhoneNoChange}
						/>
						{phoneNo && (
							<TouchableOpacity activeOpacity={0.8} onPress={clearPhoneNo}>
								<Text>
									<Entypo name="circle-with-cross" size={20} color="gray" />
								</Text>
							</TouchableOpacity>
						)}
					</View>
					<CustomButton
						title="Continue"
						containerStyles="min-h-[55px] mt-5 mx-4"
						isLoading={isLoading}
						handlePress={submit}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SignIn;
