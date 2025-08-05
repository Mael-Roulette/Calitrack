import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const ExerciseItem = ({
	image,
	name,
	type,
	difficulty,
  isSelected,
}: {
	image?: string;
	name: string;
	type: string;
	difficulty: string;
  isSelected: boolean;
}) => {
	return (
		<View className='flex-row items-center border border-secondary rounded-md py-2 px-4 mb-2'>
			{image && (
				<Image source={{ uri: image }} className='w-10 h-10 rounded-full mr-1' />
			)}
			<View className='flex-1 flex-col gap-1 mr-3'>
				<Text className='text-lg font-calsans'>{name}</Text>
				<View className='flex-row items-center gap-4 mb-1'>
					<Text className='text-sm text-primary-100 font-sregular'>Type: {type}</Text>
					<Text className='text-sm text-primary-100 font-sregular'>
						Difficulté: {difficulty}
					</Text>
				</View>
			</View>

			<TouchableWithoutFeedback onPress={() => console.log("Exercise selected")}>
        {isSelected ? (
          <Ionicons name='checkmark-circle' size={24} color='#132541' />
        ) : (
          <Ionicons name='add-circle-outline' size={24} color='#132541' />
        )}
			</TouchableWithoutFeedback>
		</View>
	);
};

export default ExerciseItem;
