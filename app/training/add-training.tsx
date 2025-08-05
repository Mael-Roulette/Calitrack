import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomTags from "@/components/CustomTags";
import { createTraining } from "@/lib/appwrite";
import { useTrainingsStore } from "@/store";
import { createTrainingParams } from "@/type";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	Alert,
	SafeAreaView,
	ScrollView,
	View
} from "react-native";

const AddTraining = () => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [form, setForm] = useState<Partial<createTrainingParams>>({
		name: "",
		days: [],
		hours: 0,
		minutes: 0,
	});
	const { fetchUserTrainings } = useTrainingsStore();
	const router = useRouter();

	const addExercise = () => {
		setIsModalVisible(true);
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
			<ScrollView>
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
						<View className='flex-1'>
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
				</View>

				<CustomButton
					title='Ajouter des exercice'
					variant='secondary'
					onPress={() => addExercise()}
				/>
			</ScrollView>

			<View className='absolute bottom-10 left-5 right-5 z-10'>
				<CustomButton
					title="Créer l'entrainement"
					onPress={() => submit()}
					isLoading={isSubmitting}
				/>
			</View>
		</SafeAreaView>
	);
};

export default AddTraining;
