import { View, Text, TextInput } from "react-native";
import { CustomInputProps } from "@/type";
import { useState } from "react";
import cn from "clsx";

const CustomInput = ({
	placeholder = "Entrer du texte",
	value,
	onChangeText,
	label,
	secureTextEntry = false,
	keyboardType = "default",
}: CustomInputProps) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View className='w-full gap-1'>
			<Text className='font-sregular text-xl'>{label}</Text>

			<TextInput
				autoCapitalize='none'
				autoCorrect={false}
				value={value}
				onChangeText={onChangeText}
				secureTextEntry={secureTextEntry}
				keyboardType={keyboardType}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				placeholder={placeholder}
				className={cn("custom-input")}
			/>
		</View>
	);
};
export default CustomInput;
