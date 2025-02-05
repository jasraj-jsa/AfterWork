import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
	Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { verifyOtp } from "@/lib/appwrite";

const Otp = () => {
	const { phoneNo, userId } = useLocalSearchParams();
	const goBack = () => router.back();
	const inputs: any = useRef([]);
	const [isLoading, setIsLoading] = useState(false);
	const [otp, setOtp] = useState(Array(6).fill(""));
	const [focusedInput, setFoucsedInput] = useState(-1);
	const handleKeyPress = (e: any, index: number) => {
		if (e.nativeEvent.key === "Backspace") {
			if (otp[index] !== "") {
				let newOtp = [...otp];
				newOtp[index] = "";
				setOtp(newOtp);
			} else if (index > 0) {
				inputs.current[index - 1].focus();
				let newOtp = [...otp];
				newOtp[index - 1] = "";
				setOtp(newOtp);
			}
		}
	};
	const handleOtpChange = async (index: number, text: string) => {
		setIsLoading(true);
		if (/^\d*$/.test(text) && text.length === 1) {
			let newOtp = [...otp];
			newOtp[index] = text;
			setOtp(newOtp);
			if (index < 5) inputs.current[index + 1].focus();
			else if (index == 5) {
				try {
					console.log(`OTP: ${newOtp.join("")}`);
					console.log(`UserId: ${userId}`);
					// const session = await verifyOtp(userId, otp.join(""));
					router.dismissAll();
					router.push("/(tabs)");
				} catch (err: any) {
					setOtp(Array(6).fill(""));
					inputs.current[0].focus();
					Alert.alert("Request Failed", err.message);
				}
			}
		}
		setIsLoading(false);
	};
	useEffect(() => {
		inputs.current[0].focus();
	}, []);
	return (
		<SafeAreaView className="bg-primary h-full">
			<View className="flex-row justify-center items-center space-x-3 ml-2 my-4">
				<TouchableOpacity
					activeOpacity={0.7}
					className="rounded-full p-2 bg-blue-900 float-left absolute left-0"
					onPress={goBack}
				>
					<Text>
						<Ionicons name="arrow-back" size={24} color="white" />
					</Text>
				</TouchableOpacity>

				<Text className="text-xl p-2 text-white font-bold">
					OTP Verification
				</Text>
			</View>
			<View className="w-full justify-center px-4 mt-7">
				<View className="items-center">
					<Text className="text-white text-base">
						We have sent a verification code to
					</Text>
					<Text className="text-white text-base font-psemibold">
						+91-{phoneNo}
					</Text>
				</View>
				<View className="mt-10 flex-row items-center justify-center space-x-3">
					{otp.map((digit, index) => (
						<View
							key={index}
							className={`rounded-lg bg-white min-w-[40px] min-h-[40px] items-center justify-center ${
								focusedInput === index && "border-2 border-blue-700"
							}`}
						>
							<TextInput
								ref={(ref) => (inputs.current[index] = ref)}
								className="text-[20px] text-center"
								maxLength={1}
								keyboardType="number-pad"
								inputMode="numeric"
								onFocus={() => setFoucsedInput(index)}
								onBlur={() => setFoucsedInput(-1)}
								value={digit}
								onChangeText={(text: string) => handleOtpChange(index, text)}
								onKeyPress={(e) => handleKeyPress(e, index)}
							/>
						</View>
					))}
				</View>
				{isLoading && (
					<View className="mt-4 justify-center items-center">
						<ActivityIndicator size="large" color="#3b82f6" />
					</View>
				)}

				<Text className="text-white text-sm font-pmedium mt-8 text-center">
					Didn't get the OTP?
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default Otp;
