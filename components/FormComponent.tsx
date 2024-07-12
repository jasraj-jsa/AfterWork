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

type direction = "row" | "col";

interface FormProps {
	label?: string;
	placeholder?: string;
	direction?: direction;
	multiline?: boolean;
	inputType?: InputType;
	viewStyle?: string;
	textStyle?: string;
	inputStyle?: string;
}

const FormComponent: React.FC<FormProps> = ({
	label,
	placeholder,
	direction,
	multiline,
	inputType,
	viewStyle,
	textStyle,
	inputStyle,
}) => {
	return (
		<View
			className={
				direction === "row"
					? `space-x-4 flex-row items-center mb-4 ${viewStyle}`
					: `space-y-1 justify-center mb-4 ${viewStyle}`
			}
		>
			{label && (
				<Text className={`text-white font-semibold ${textStyle}`}>{label}</Text>
			)}
			<TextInput
				className={`rounded-xl border bg-gray-50 w-full p-4 ${inputStyle}`}
				placeholder={placeholder ? placeholder : ""}
				multiline={multiline ? multiline : false}
				inputMode={inputType ? inputType : "text"}
			/>
		</View>
	);
};

export default FormComponent;
