import CustomButton from "@/components/CustomButton";
import { useAuthStore, useGoalsStore, useTrainingsStore } from "@/store";
import { Goal } from "@/type";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoalItem from "../goal/components/GoalItem";
import TrainingDay from "../training/components/TrainingDay";
import { getTrainingFromUserByDay } from "@/lib/appwrite";

export default function Index() {
	const { user, isLoading } = useAuthStore();
	const { goals, isLoadingGoals, fetchUserGoals } = useGoalsStore();
	const { fetchUserTrainings } = useTrainingsStore();
	const router = useRouter();
	const [todayTraining, setTodayTraining] = useState<any>([]);
	const today = new Date()
		.toLocaleDateString("en-EN", {
			weekday: "long",
		})
		.toLowerCase();

	if (!user) {
		router.replace("/(auth)/home");
	}

	// Récupérer le training du jour
	useEffect(() => {
		const fetchTodayTraining = async () => {
			try {
				const training = await getTrainingFromUserByDay(today);
				if (training.length > 0) {
					setTodayTraining(training[0]);
				}
			} catch (error) {
				console.error("Error fetching today's training:", error);
			}
		};

		fetchTodayTraining();
	}, [today]);

	const goToCalendar = () => {
		router.push("/calendar");
	};

	// Récupération des objectifs en cours
	useEffect(() => {
		fetchUserGoals();
		fetchUserTrainings();
	}, [fetchUserGoals, fetchUserTrainings]);

	const { progressGoals } = useMemo(
		() => ({
			progressGoals: goals.filter((goal: Goal) => goal.state === "in-progress"),
		}),
		[goals]
	);

	return (
		<SafeAreaView className='pt-10 bg-background min-h-full'>
			{isLoading ? (
				<View>
					<Text className='title'>Chargement...</Text>
				</View>
			) : (
				<ScrollView showsVerticalScrollIndicator={true} className='flex-1 px-5'>
					<View className='mb-8 flex-row items-center justify-between'>
						<Text className='title'>Salut {user?.name || "utilisateur"} !</Text>
						<Link href={"/notifications"} className='mr-4'>
							<Ionicons
								name='notifications-outline'
								size={30}
								color='#132541'
							/>
						</Link>
					</View>

					<View>
						{todayTraining !== null && todayTraining.$id ? (
							<TrainingDay
								id={todayTraining.$id}
								name={todayTraining.Name}
								duration={todayTraining.Duration}
							/>
						) : (
							<Text className='text-primary-100 text-lg mb-2 italic'>
								Aucun entraînement prévu pour aujourd&apos;hui.
							</Text>
						)}

						<CustomButton
							title='Voir mon planning'
							variant='secondary'
							customStyles='mt-5'
							onPress={goToCalendar}
						/>
					</View>

					<View>
						<View className='flex-row gap-2 items-center mt-8 mb-4'>
							<Feather name='target' size={24} color='#FC7942' />
							<Text className='text-2xl font-calsans text-primary'>
								Mes objectifs en cours
							</Text>
						</View>

						{isLoadingGoals ? (
							<View>
								<Text className='text-primary-100 italic text-lg mt-5'>
									Chargement...
								</Text>
							</View>
						) : (
							<View>
								{progressGoals.map((item: Goal) => (
									<GoalItem
										key={item.$id}
										$id={item.$id}
										title={item.title}
										type={item.type}
										progress={item.progress}
										progressHistory={item.progressHistory}
										total={item.total}
										state={item.state}
										$createdAt={item.$createdAt}
										$updatedAt={item.$updatedAt}
									/>
								))}
								{progressGoals.length === 0 && (
									<Text className='text-primary-100 italic text-lg mt-5'>
										Aucun objectif
									</Text>
								)}
							</View>
						)}
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
}
