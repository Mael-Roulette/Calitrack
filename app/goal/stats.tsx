import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useGoalsStore } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";
import GoalStats from "./components/GoalStats";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const Stats = () => {
	const { goals } = useGoalsStore();

	return (
		<SafeAreaView className='pt-8 bg-background min-h-full flex-1'>
			<View className='mb-8 px-5 flex-row items-center justify-start'>
				<Link href={"/profile"} className='mr-4'>
					<AntDesign name='caretleft' size={24} color='#132541' />
				</Link>
				<Text className='title'>Statistiques</Text>
			</View>
			<ScrollView className='px-5'>
				<View className='flex-col gap-5'>
					{goals.map((goal) => (
						<GoalStats
							key={goal.$id}
							title={goal.title}
							state={goal.state ?? ""}
							progressHistory={goal.progressHistory}
							total={goal.total}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Stats;
