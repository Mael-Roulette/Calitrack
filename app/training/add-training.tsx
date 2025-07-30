// npm install react-tag-input
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomTags from "@/components/CustomTags";
import { createTraining } from "@/lib/appwrite";
import { useTrainingsStore } from "@/store";
import { createTrainingParams } from "@/type";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddTraining = () => {
	const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const [form, setForm] = useState<Partial<createTrainingParams>>({
		name: "",
		days: [],
		hours: 0,
		minutes: 0,
	});

	const { fetchUserTrainings } = useTrainingsStore();
	const router = useRouter();

	const submit = async (): Promise<void> => {
		if (!form.name || !form.days || !form.hours || !form.minutes) {
			Alert.alert("Erreur", "Veuillez remplir tous les champs");
			return;
		}
		const totalDuration = form.hours * 60 + form.minutes;

		const trainingData = {
			name: form.name,
			days: form.days,
			duration: totalDuration,
		};

		try {
			await createTraining(trainingData);
			await fetchUserTrainings();
			router.push("/trainings");
		} catch (err) {
			console.error(err);
			Alert.alert("Erreur", "Échec de l'ajout. Réessayez.");
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
		<SafeAreaView className='bg-background min-h-full px-5 pt-16'>
			<View className='mb-8 flex-row items-center'>
				<Link href='/trainings' className='mr-4'>
					<AntDesign name='caretleft' size={24} color='#132541' />
				</Link>
				<Text className='text-3xl text-primary font-calsans'>
					Ajouter un entrainement
				</Text>
			</View>
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
						onChangeText={setSelectedDays}
						maxTags={7}
						allowCustomTags={false}
					/>

					<CustomButton title="Créer l'entrainement" onPress={() => submit()} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default AddTraining;
