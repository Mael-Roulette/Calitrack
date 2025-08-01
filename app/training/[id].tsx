import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { getTrainingById } from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

const TrainingPage = () => {
	const { id } = useLocalSearchParams();
	const [training, setTraining] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const navigation = useNavigation();

	useEffect(() => {
		const fetchTraining = async () => {
			setLoading(true);

			try {
				const response = await getTrainingById(id as string);
				setTraining(response);
			} catch (error) {
				console.error(
					"Erreur lors de la récupération de l'entrainement",
					error
				);
			} finally {
				setLoading(false);
			}
		};

			fetchTraining();
	}, [id]);

	useLayoutEffect(() => {
		if (training) {
			navigation.setOptions({
				title: training.name,
			});
		}
	}, [navigation, training]);

	return (
		<SafeAreaView className='bg-background min-h-full px-5'>
			{loading ? (
				<View className='flex-1 justify-center items-center'>
					<ActivityIndicator size='large' color='#FC7942' />
					<Text className='mt-2 text-primary'>Chargement...</Text>
				</View>
			) : (
				<View>
					<Text className='text-primary-100 italic'>Mon training</Text>
				</View>
			)}
		</SafeAreaView>
	);
};

export default TrainingPage;
