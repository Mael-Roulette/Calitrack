import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomTags from "@/components/CustomTags";
import { createTraining } from "@/lib/appwrite";
import { useTrainingsStore } from "@/store";
import { createTrainingParams } from "@/type";
import { useRouter } from "expo-router";
import React, { useState, useRef, useEffect } from "react";
import {
	Alert,
	ScrollView,
	View,
	SafeAreaView,
	Modal,
	Text,
	TouchableWithoutFeedback,
	Animated,
	PanResponder,
	Dimensions,
} from "react-native";
import ExerciseItem from "../exercise/components/ExerciseItem";

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

	const panY = useRef(new Animated.Value(0)).current;
	const screenHeight = Dimensions.get("screen").height;

	const resetPositionAnim = Animated.timing(panY, {
		toValue: 0,
		duration: 300,
		useNativeDriver: true,
	});

	const closeAnim = Animated.timing(panY, {
		toValue: screenHeight,
		duration: 300,
		useNativeDriver: true,
	});

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: (e, gestureState) => {
				if (gestureState.dy > 0) {
					panY.setValue(gestureState.dy);
				}
			},
			onPanResponderRelease: (e, gestureState) => {
				if (gestureState.dy > 200) {
					closeModal();
				} else {
					resetPositionAnim.start();
				}
			},
		})
	).current;

	useEffect(() => {
		if (isModalVisible) {
			resetPositionAnim.start();
		}
	}, [isModalVisible]);

	const closeModal = () => {
		closeAnim.start(() => {
			setIsModalVisible(false);
		});
	};

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

			<Modal
				animationType='slide'
				transparent={true}
				visible={isModalVisible}
				onRequestClose={closeModal}
			>
				<TouchableWithoutFeedback onPress={closeModal}>
					<View className='flex-1 bg-black/40 justify-end'>
						<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
							<Animated.View
								style={{
									transform: [{ translateY: panY }],
									shadowColor: "#000",
									shadowOffset: { width: 0, height: -10 },
									shadowOpacity: 0.25,
									shadowRadius: 10,
									elevation: 10,
									borderTopLeftRadius: 20,
									borderTopRightRadius: 20,
								}}
								className='bg-background p-5 h-3/5 w-full'
							>
								<View
									{...panResponder.panHandlers}
									className='flex justify-center items-center mb-3 h-4 w-full'
								>
									<View className='h-1 w-16 bg-primary-100 rounded-full'></View>
								</View>

								<View>
									<Text className='text-center text-primary font-calsans text-lg'>
										Choisis tes exercices
									</Text>

									<Text className='text-center text-primary-100 italic text-sm mb-3'>
										(En cours de développement)
									</Text>

									<ExerciseItem name="Full planche" type="Push" difficulty="Avancée" />
								</View>
							</Animated.View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</SafeAreaView>
	);
};

export default AddTraining;
