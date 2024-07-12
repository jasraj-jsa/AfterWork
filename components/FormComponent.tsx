import { View, Text, TextInput } from "react-native";
import React from "react";

type InputType =
	| "decimal"
	| "email"
	| "none"
	| "numeric"
	| "search"
	| "tel"
	| "text"
	| "url";

interface FormProps {
	label: string;
	placeholder?: string;
	multiline?: boolean;
	inputType?: InputType;
	viewStyle?: string;
	textStyle?: string;
	inputStyle?: string;
}

const FormComponent: React.FC<FormProps> = ({
	label,
	placeholder,
	multiline,
	inputType,
	viewStyle,
	textStyle,
	inputStyle,
}) => {
	return (
		<View className={`space-y-1 ${viewStyle}`}>
			<Text className={`text-white font-semibold ${textStyle}`}>{label}</Text>
			<TextInput
				className={`rounded-xl border mb-4 bg-gray-50 w-full p-4 ${inputStyle}`}
				placeholder={placeholder ? placeholder : ""}
				multiline={multiline ? multiline : false}
				inputMode={inputType ? inputType : "text"}
			/>
		</View>
	);
};

export default FormComponent;
