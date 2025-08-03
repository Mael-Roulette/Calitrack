import { useGoalsStore } from "@/store";
import { Goal } from "@/type";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useMemo } from "react";
import {
	Alert,
	FlatList,
	Text,
	TouchableOpacity,
	View,
	SafeAreaView,
} from "react-native";
import GoalItem from "../goal/components/GoalItem";

const Goals = () => {
	const { goals } = useGoalsStore();
	const router = useRouter();
	const navigation = useNavigation();

	const handleAddGoalLink = () => {
		if (goals.length >= 10) {
			Alert.alert(
				"Limite atteinte",
				"Vous ne pouvez pas ajouter plus de 10 entrainements."
			);
		} else {
			router.push("/goal/add-goal");
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={handleAddGoalLink} className='mr-4'>
					<Ionicons name='add-circle-outline' size={30} color='#132541' />
				</TouchableOpacity>
			),
		});
	}, [navigation, goals.length]);

	const { progressGoals, finishedGoals } = useMemo(
		() => ({
			progressGoals: goals.filter((goal) => goal.state === "in-progress"),
			finishedGoals: goals.filter((goal) => goal.state === "finish"),
		}),
		[goals]
	);

	const renderGoalItem = ({ item }: { item: Goal }) => (
		<GoalItem
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
	);

	const ListHeaderComponent = ({
		icon,
		title,
	}: {
		icon: any;
		title: string;
	}) => (
		<View className='mb-5 mt-4'>
			<View className='flex-row items-center gap-2'>
				{icon}
				<Text className='font-calsans text-2xl text-primary'>{title}</Text>
			</View>
		</View>
	);

	const sections = useMemo(() => {
		const sectionsArray = [
			{
				icon: <></>,
				title: "Objectifs en cours",
				data: progressGoals,
				showHeader: false,
			},
		];

		if (finishedGoals.length > 0) {
			sectionsArray.push({
				icon: <FontAwesome6 name='medal' size={24} color='#FC7942' />,
				title: "Mes objectifs réussis",
				data: finishedGoals,
				showHeader: true,
			});
		}

		return sectionsArray;
	}, [progressGoals, finishedGoals]);

	return (
		<SafeAreaView className='px-5 bg-background flex-1'>
			<View className='mb-6'>
				<Text className='text-primary-100 italic'>
					Nombre d&apos;objectifs en cours : {progressGoals.length}/4.
				</Text>
			</View>
			{goals.length !== 0 && (
				<View className='mb-6'>
					<Text className='text-primary-100 italic'>
						Vous pouvez ajouter une nouvelle progression en cliquant sur un
						objectif.
					</Text>
				</View>
			)}
			<FlatList
				data={sections}
				keyExtractor={(item, index) => `section-${index}`}
				showsVerticalScrollIndicator={false}
				renderItem={({ item: section }) => (
					<View>
						{section.showHeader && (
							<ListHeaderComponent icon={section.icon} title={section.title} />
						)}
						<FlatList
							data={section.data}
							renderItem={renderGoalItem}
							keyExtractor={(item, index) => item.$id || `goal-${index}`}
							scrollEnabled={false}
							showsVerticalScrollIndicator={false}
							ListEmptyComponent={
								<Text className='text-primary-100 italic text-lg mt-5'>
									Aucun objectif.
								</Text>
							}
						/>
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

export default Goals;
