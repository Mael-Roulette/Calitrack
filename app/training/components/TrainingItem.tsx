import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";

const TrainingItem = ({
	id,
	title,
	level,
	duration,
}: {
	id: string;
	title: string;
	level: string;
	duration: number;
}) => {
	const levelLabels = {
		beginner: "Débutant",
		medium: "Intermédiaire",
		advance: "Avancé",
		expert: "Expert",
		elite: "Élite",
	};

	const router = useRouter();
	const goToTraining = ({ id }: { id: string }) => {
		router.push(`/training/${id}`);
	};

	return (
		<View className='w-full px-5 py-4 mb-5 border-[1px] rounded-xl border-secondary'>
			<View className='flex-row items-center justify-between mb-3'>
				<Text className='font-sregular text-primary text-lg'>{title}</Text>
				<Text
					className={`text-xs font-sregular px-3 py-2 rounded-full border-[1px] border-secondary text-secondary`}
				>
					{levelLabels[level as keyof typeof levelLabels] || level}
				</Text>
			</View>

			<View className='flex-row items-center gap-2 mb-5'>
				<Ionicons name='time-sharp' size={24} color='#132541' />
				<Text className='text-primary font-sregular text-base'>
					{duration} minutes
				</Text>
			</View>

			<CustomButton
				title="Voir l'entrainement"
				onPress={() => goToTraining({ id })}
			/>
		</View>
	);
};

export default TrainingItem;
