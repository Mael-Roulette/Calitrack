// app/exercise/components/ExerciseItem.tsx
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ExerciseItem = ({
	name,
	type,
	difficulty,
	isSelected = false,
	onPress,
}: {
	name: string;
	type: string;
	difficulty: string;
	isSelected?: boolean;
	onPress?: () => void;
}) => {
	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty.toLowerCase()) {
			case "beginner":
				return "text-green-500";
			case "intermediate":
				return "text-yellow-500";
			case "advanced":
				return "text-orange-500";
			case "expert":
				return "text-red-500";
			default:
				return "text-primary-100";
		}
	};

	return (
		<TouchableOpacity
			className={`flex-row items-center justify-between p-4 mb-3 rounded-xl border ${
				isSelected
					? "border-secondary bg-secondary/10"
					: "border-primary-100 bg-background"
			}`}
			onPress={onPress}
			disabled={!onPress}
		>
			<View className='flex-1'>
				<Text className='text-primary font-sregular text-lg mb-1'>{name}</Text>
				<View className='flex-row items-center gap-3'>
					<Text className='text-primary-100 text-sm font-sregular'>Type : {type}</Text>
					<Text className='text-sm font-medium text-primary-100 font-sregular'>
						Difficulté :{" "}
						<Text className={`${getDifficultyColor(difficulty)}`}>
							{difficulty}
						</Text>
					</Text>
				</View>
			</View>

			{onPress && (
				<View
					className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
						isSelected ? "border-secondary bg-secondary" : "border-primary-100"
					}`}
				>
					{isSelected && <Ionicons name='checkmark' size={16} color='white' />}
				</View>
			)}
		</TouchableOpacity>
	);
};

export default ExerciseItem;
