import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomTags from "@/components/CustomTags";
import { createTraining } from "@/lib/appwrite";
import { useTrainingsStore } from "@/store";
import { createTrainingParams, Exercise } from "@/type";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Alert, SafeAreaView, ScrollView, View, Text } from "react-native";
import ExerciseSelectionModal from "./components/ExerciseSelectionModal";
import ExerciseItem from "../exercise/components/ExerciseItem";

const AddTraining = () => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
	const [form, setForm] = useState<Partial<createTrainingParams>>({
		name: "",
		days: [],
		hours: 0,
		minutes: 0,
	});
	const { fetchUserTrainings } = useTrainingsStore();
	const router = useRouter();

	// Log des exercices sélectionnés à chaque changement
	useEffect(() => {
		console.log("=== Exercices sélectionnés ===");
		console.log(`Nombre d'exercices: ${selectedExercises.length}`);
		selectedExercises.forEach((exercise, index) => {
			console.log(
				`${index + 1}. ${exercise.name} (${exercise.type} - ${exercise.difficulty})`
			);
		});
		console.log("===============================");
	}, [selectedExercises]);

	const openExerciseModal = () => {
		setIsModalVisible(true);
	};

	const closeExerciseModal = () => {
		setIsModalVisible(false);
	};

	const handleExerciseSelection = (exercises: Exercise[]) => {
		setSelectedExercises(exercises);
		setIsModalVisible(false);
	};

	const submit = async (): Promise<void> => {
		if (!form.name || !form.days) {
			Alert.alert("Erreur", "Veuillez remplir tous les champs");
			return;
		}

		if (form.hours === undefined) {
			form.hours = 0;
		}

		if (form.minutes === undefined) {
			form.minutes = 0;
		}

		const totalDuration = form.hours * 60 + form.minutes;

		const trainingData = {
			name: form.name,
			days: form.days,
			duration: totalDuration,
			exercises: selectedExercises,
		};

		try {
			setIsSubmitting(true);
			await createTraining(trainingData);
			await fetchUserTrainings();
			router.push("/trainings");
		} catch (err) {
			console.error(err);
			Alert.alert("Erreur", "Échec de l'ajout. Réessayez.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const daysSuggestions = [
		{ label: "Lundi", value: "monday" },
		{ label: "Mardi", value: "tuesday" },
		{ label: "Mercredi", value: "wednesday" },
		{ label: "Jeudi", value: "thursday" },
		{ label: "Vendredi", value: "friday" },
		{ label: "Samedi", value: "saturday" },
		{ label: "Dimanche", value: "sunday" },
	];

	return (
		<SafeAreaView className='flex-1 bg-background min-h-full px-5'>
			<ScrollView className='flex-1'>
				<View className='flex-col gap-5'>
					<CustomInput
						label="Nom de l'entrainement"
						value={form.name}
						placeholder='Ex : Planche + combo'
						onChangeText={(t: string) => setForm((p) => ({ ...p, name: t }))}
					/>

					<View className='flex-row w-full gap-3'>
						<View className='flex-1'>
							<CustomInput
								label='Heure'
								value={String(form.hours)}
								placeholder='1'
								onChangeText={(t: string) =>
									setForm((p) => ({ ...p, hours: parseInt(t) || 0 }))
								}
								keyboardType='numeric'
							/>
						</View>
						<View className='h-full'>
							<CustomInput
								label='Minutes'
								value={String(form.minutes)}
								placeholder='30'
								onChangeText={(t: string) =>
									setForm((p) => ({ ...p, minutes: parseInt(t) || 0 }))
								}
								keyboardType='numeric'
							/>
						</View>
					</View>

					<CustomTags
						label='Jours de disponibilité'
						placeholder="Sélectionnez vos jours d'entrainement..."
						suggestions={daysSuggestions}
						value={selectedDays}
						onChangeText={(days) => {
							setSelectedDays(days);
							setForm((prev) => ({ ...prev, days }));
						}}
						maxTags={7}
						allowCustomTags={false}
					/>

					{selectedExercises.length > 0 && (
						<View className='mb-4'>
							<Text className='text-primary font-calsans text-lg mb-2'>
								Exercices sélectionnés ({selectedExercises.length})
							</Text>
							{selectedExercises.map((exercise, index) => (
								<ExerciseItem
									key={exercise.$id}
									name={exercise.name}
									type={exercise.type}
									difficulty={exercise.difficulty}
								/>
							))}
						</View>
					)}
				</View>

				<CustomButton
					title={`${selectedExercises.length > 0 ? "Modifier les" : "Ajouter des"} exercices${selectedExercises.length > 0 ? ` (${selectedExercises.length})` : ""}`}
					variant='secondary'
					onPress={openExerciseModal}
				/>
			</ScrollView>

			<CustomButton
				title="Créer l'entrainement"
				onPress={submit}
				isLoading={isSubmitting}
				customStyles='mt-5 mb-10'
			/>

			<ExerciseSelectionModal
				isVisible={isModalVisible}
				onClose={closeExerciseModal}
				onExerciseSelected={handleExerciseSelection}
				initialSelectedExercises={selectedExercises}
			/>
		</SafeAreaView>
	);
};

export default AddTraining;
