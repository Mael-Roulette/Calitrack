import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomCalendar from "../calendar/components/CustomCalendar";
import TrainingItem from "../training/components/TrainingItem";
import { useEffect, useState } from "react";
import { getTrainingFromUserByDay } from "@/lib/appwrite";
import { Training } from "@/type";

const Calendar = () => {
	const [upcomingTrainings, setUpcomingTrainings] = useState<any[]>([]);

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

		return `${days[date.getDay()]} ${date.getDate()}`;
	};

	useEffect(() => {
		const fetchUpcomingTrainings = async () => {
			try {
				const nextDays = [];
				const currentDate = new Date();

				for (let i = 0; i <= 2; i++) {
					const nextDate = new Date();
					nextDate.setDate(currentDate.getDate() + i);

					const dayName = getDayInEnglish(nextDate);
					const trainings = await getTrainingFromUserByDay(dayName);

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
					{upcomingTrainings.map((item, index) => {
						const isFirstDay = index === 0;
						const formattedDate = isFirstDay ? "Entrainement du jour" : formatDate(item.date);

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
														isTrainingDay={isFirstDay}
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
