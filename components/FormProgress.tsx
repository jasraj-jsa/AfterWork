import { View, Text } from "react-native";
import React from "react";

interface FormProgressProps {
	sections: Array<string>;
	selectedSectionPosition: number;
	mainStyles?: string;
}

const FormProgress: React.FC<FormProgressProps> = ({
	sections,
	selectedSectionPosition,
	mainStyles,
}) => {
	return (
		<View
			className={`flex-row justify-center items-center ${mainStyles || ""}`}
		>
			{sections.map((section) => (
				<View className="items-start space-y-2 mx-2 flex-1" key={section}>
					<View
						className={`border-2 w-full ${
							section === sections[selectedSectionPosition - 1]
								? "border-blue-800"
								: "border-gray-500"
						}`}
					></View>
					<Text
						className={`text-md ${
							section === sections[selectedSectionPosition - 1]
								? "text-white font-medium"
								: "text-gray-500"
						}`}
					>
						{section}
					</Text>
				</View>
			))}
		</View>
	);
};

export default FormProgress;
