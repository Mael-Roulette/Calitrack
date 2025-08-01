import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomCalendar from "../calendar/components/CustomCalendar";
import TrainingItem from "../training/components/TrainingItem";
import { useTrainingsStore } from "@/store";
import { useEffect, useState } from "react";
import { getTrainingFromUserByDay } from "@/lib/appwrite";
import { Training } from "@/type";

const Calendar = () => {
	const { fetchUserTrainings } = useTrainingsStore();
	const [todayTrainings, setTodayTrainings] = useState<any[]>([]);
	const [upcomingTrainings, setUpcomingTrainings] = useState<any[]>([]);

	// Fonction pour obtenir le jour en anglais et en minuscule
	const getDayInEnglish = (date: Date) => {
		const days = [
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		];
		return days[date.getDay()];
	};

	// Format une date en jour de la semaine et date
	const formatDate = (date: Date) => {
		const days = [
			"Dimanche",
			"Lundi",
			"Mardi",
			"Mercredi",
			"Jeudi",
			"Vendredi",
			"Samedi",
		];
		const months = [
			"Janvier",
			"Février",
			"Mars",
			"Avril",
			"Mai",
			"Juin",
			"Juillet",
			"Août",
			"Septembre",
			"Octobre",
			"Novembre",
			"Décembre",
		];

		return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
	};

	// Récupérer les trainings du jour
	useEffect(() => {
		const fetchTodayTrainings = async () => {
			try {
				const today = getDayInEnglish(new Date());
				const trainings = await getTrainingFromUserByDay(today);
				setTodayTrainings(trainings || []);
			} catch (error) {
				console.error("Error fetching today's trainings:", error);
				setTodayTrainings([]);
			}
		};

		fetchTodayTrainings();
	}, []);

	// Récupérer les entraînements des 2 prochains jours
	useEffect(() => {
		const fetchUpcomingTrainings = async () => {
			try {
				const nextDays = [];
				const currentDate = new Date();

				// Récupérer les entraînements pour les 2 prochains jours seulement
				for (let i = 1; i <= 2; i++) {
					const nextDate = new Date();
					nextDate.setDate(currentDate.getDate() + i);

					const dayName = getDayInEnglish(nextDate);
					const trainings = await getTrainingFromUserByDay(dayName);

					// On ajoute toujours l'entrée avec tous les entraînements du jour
					nextDays.push({
						date: nextDate,
						trainings: trainings || [],
					});
				}

				setUpcomingTrainings(nextDays);
			} catch (error) {
				console.error("Error fetching upcoming trainings:", error);
			}
		};

		fetchUpcomingTrainings();
	}, []);
	return (
		<SafeAreaView className='px-5 pt-16 bg-background flex-1'>
			<ScrollView>
				<View className='mb-8 flex-row items-center justify-between'>
					<Text className='title'>Calendrier</Text>
				</View>

				<CustomCalendar />

				<View className='mt-10'>
					<Text className='text-2xl text-primary font-calsans mb-3'>
						Entrainement du jour
					</Text>
					{todayTrainings.length > 0 ? (
						<>
							{todayTrainings.map((training, index) => (
								<View
									key={`today-${training.$id}-${index}`}
									className={index > 0 ? "mt-3" : ""}
								>
									<TrainingItem
										id={training.$id}
										title={training.Name}
										duration={training.Duration}
										isTrainingDay={true}
									/>
								</View>
							))}
						</>
					) : (
						<Text className='text-primary-100 text-lg italic'>
							Aucun entraînement prévu pour aujourd&apos;hui.
						</Text>
					)}
				</View>

				<View className='mt-5'>
					{upcomingTrainings.map((item, index) => {
						const isFirstDay = index === 0;
						const formattedDate = isFirstDay ? "Demain" : formatDate(item.date);

						return (
							<View
								key={`${item.date.getTime()}-${index}`}
								className={index > 0 ? "mt-5" : ""}
							>
								<Text className='text-xl text-primary font-calsans mb-3'>
									{formattedDate}
								</Text>
								{item.trainings.length > 0 ? (
									<>
										{item.trainings.map(
											(training: Training, trainingIndex: number) => (
												<View
													key={`${item.date.getTime()}-${training.$id}-${trainingIndex}`}
													className={trainingIndex > 0 ? "mt-3" : ""}
												>
													<TrainingItem
														id={training.$id}
														title={training.Name}
														duration={training.Duration}
													/>
												</View>
											)
										)}
									</>
								) : (
									<Text className='text-primary-100 text-lg italic mb-3'>
										Aucun entraînement prévu.
									</Text>
								)}
							</View>
						);
					})}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Calendar;
