import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getTrainingFromUserByDay } from "@/lib/appwrite";
import TrainingItem from "../training/components/TrainingItem";

const Day = () => {
	const { day, month, year } = useLocalSearchParams();
	const navigation = useNavigation();
	const [dayTrainings, setDayTrainings] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	/* -------------------------------------------------- */
	/* ---------- Modification du custom header ---------- */
	const formatDate = () => {
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

		return `${day} ${months[Number(month) - 1]} ${year}`;
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<Text className='text-2xl font-calsans text-primary'>
					{formatDate()}
				</Text>
			),
		});
	}, [navigation]);

	/* -------------------------------------------------- */
	/* ---------- Récupération des entrainements associé au jour ---------- */
	useEffect(() => {
		const fetchDayTrainings = async () => {
			try {
				setIsLoading(true);

				const selectedDate = new Date(
					Number(year),
					Number(month) - 1,
					Number(day)
				);

				const daysOfWeek = [
					"sunday",
					"monday",
					"tuesday",
					"wednesday",
					"thursday",
					"friday",
					"saturday",
				];
				const dayOfWeek = daysOfWeek[selectedDate.getDay()];

				const trainings = await getTrainingFromUserByDay(dayOfWeek);

				setDayTrainings(trainings);
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des entrainements :",
					error
				);
			} finally {
				setIsLoading(false);
			}
		};

		fetchDayTrainings();
	}, [day, month, year]);

	return (
		<SafeAreaView className='flex-1 bg-background px-5'>
			<View>
				{isLoading ? (
					<Text>Chargement des entraînements...</Text>
				) : dayTrainings.length > 0 ? (
					dayTrainings.map((training, index) => (
						<TrainingItem
							id={training.$id}
							key={`${training.$id}-${index}`}
							title={training.Name}
              days={training.Days}
              duration={training.Duration}
						/>
					))
				) : (
					<Text>Aucun entraînement prévu pour cette journée</Text>
				)}
			</View>
		</SafeAreaView>
	);
};

export default Day;
