import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";

const TrainingItem = ({
	id,
	title,
	duration,
}: {
	id: string;
	title: string;
	duration: number;
}) => {
	const router = useRouter();
	const goToTraining = ({ id }: { id: string }) => {
		router.push(`/training/${id}`);
	};

	return (
		<View className='w-full px-5 py-4 mb-5 border-[1px] rounded-xl border-secondary'>
			<View className='flex-row items-center justify-between mb-5'>
				<Text className='font-sregular text-primary text-xl'>{title}</Text>

				<View className='flex-row items-center gap-2'>
					<Ionicons name='time-sharp' size={24} color='#132541' />
					<Text className='text-primary font-sregular text-base'>
						{duration < 60
							? `${duration} minutes`
							: `${Math.floor(duration / 60)}h${duration % 60 === 0 ? '' : duration % 60}`}
					</Text>
				</View>
			</View>

			<CustomButton
				title="Voir l'entrainement"
				onPress={() => goToTraining({ id })}
			/>
		</View>
	);
};

export default TrainingItem;
