import { useAuthStore, useGoalsStore } from "@/store";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
import { useEffect, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { Goal } from "@/type";

export default function Index() {
	const { user, isLoading } = useAuthStore();
	const { goals, isLoadingGoals, fetchUserGoals } = useGoalsStore();

	const goToCalendar = () => {
		// router.push("/calendar");
	};

	// Récupération des objectifs en cours
	useEffect(() => {
		fetchUserGoals();
	}, [fetchUserGoals]);

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
					<Text className='text-3xl font-calsans text-primary'>
						Chargement...
					</Text>
				</View>
			) : (
				<ScrollView showsVerticalScrollIndicator={true} className='flex-1 px-5'>
					<View className='mb-8 flex-row items-center justify-between'>
						<Text className='text-3xl text-primary font-calsans'>
							Salut {user?.name || "utilisateur"} !
						</Text>
						<Link href="/notifications" className='mr-4'>
							<Ionicons
								name='notifications-outline'
								size={30}
								color='#132541'
							/>
						</Link>
					</View>

					<View>
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
										id={item.$id}
										title={item.title}
										type={item.type}
										progress={item.progress}
										total={item.total}
										state={item.state}
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
