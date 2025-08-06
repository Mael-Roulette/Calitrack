import ExerciseItem from "@/app/exercise/components/ExerciseItem";
import CustomButton from "@/components/CustomButton";
import { DAYS_TRANSLATION } from "@/constants/value";
import { getTrainingById, incrementUserTrainings } from "@/lib/training.appwrite";
import { useAuthStore } from "@/store";
import { Exercise } from "@/type";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Session = () => {
	const { id } = useLocalSearchParams();
	const { user, refreshUser } = useAuthStore();
	const [training, setTraining] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [trainingExercises, setTrainingExercises] = useState<Exercise[]>([]);
	const [isFinishing, setIsFinishing] = useState(false);
	const router = useRouter();
	const navigation = useNavigation();

	/* -------------------------------------------------- */
	/* ---------- Récupérer les informations de l'entrainement ---------- */
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
				router.push("/trainings");
			} finally {
				setLoading(false);
			}
		};
		fetchTraining();
	}, [id, router]);

	/* ----- Modification du custom header ----- */
	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<Text
					className='title text-ellipsis overflow-hidden max-w-60'
					numberOfLines={1}
				>
					{training?.Name || "Entrainement"}
				</Text>
			),
		});
	}, [navigation, training]);

	/* ----- Affichage des bons exercices ----- */
	useEffect(() => {
		if (training && training.exercise) {
			setTrainingExercises(training.exercise);
		}
	}, [training]);

	const renderExerciseItem = ({ item }: { item: Exercise }) => (
		<ExerciseItem
			name={item.Name}
			type={item.Type}
			difficulty={item.Difficulty}
		/>
	);

	/* ----- Méthode pour gérer la fin de l'entrainement ----- */
	const handleEndTraining = async () => {
		if (!user?.$id) {
			console.error("Utilisateur non connecté");
			router.push("/trainings");
			return;
		}

		setIsFinishing(true);

		try {
			await incrementUserTrainings(user.$id);
			await refreshUser();
		} catch (error) {
			console.error("Erreur lors de la sauvegarde:", error);
		} finally {
			setIsFinishing(false);
			router.push("/trainings");
		}
	};

	return (
		<SafeAreaView className='bg-background min-h-full px-5'>
			{loading ? (
				<View className='flex-1 justify-center items-center'>
					<ActivityIndicator size='large' color='#FC7942' />
					<Text className='mt-2 text-primary'>Chargement...</Text>
				</View>
			) : (
				<>
					<View className='flex-1 h-full'>
						<Text className='text-lg font-sregular text-primary mb-2'>
							Durée:{" "}
							{training?.Duration < 60
								? `${training?.Duration} minutes`
								: `${Math.floor((training?.Duration ?? 0) / 60)}h${(training?.Duration ?? 0) % 60 === 0 ? "" : (training?.Duration ?? 0) % 60}`}
						</Text>
						{training.Days.length > 0 && (
							<View className='flex-row items-center gap-2 mb-4'>
								{training.Days.map((day: string, index: number) => (
									<Text
										key={index}
										className='py-1 px-3 bg-background rounded-full border border-secondary text-secondary font-sregular text-xs'
									>
										{DAYS_TRANSLATION.find((d) => d.value === day)?.label ||
											day}
									</Text>
								))}
							</View>
						)}
						<FlatList
							data={trainingExercises}
							renderItem={renderExerciseItem}
							keyExtractor={(item) => item.Name}
							showsVerticalScrollIndicator={false}
							ListEmptyComponent={
								<Text className='text-primary-100 italic text-lg mt-5'>
									Aucun exercice
								</Text>
							}
						/>
					</View>
					<View className='my-5'>
						<CustomButton
							title='Entrainement terminé !'
							onPress={handleEndTraining}
							isLoading={isFinishing}
						/>
					</View>
				</>
			)}
		</SafeAreaView>
	);
};

export default Session;
