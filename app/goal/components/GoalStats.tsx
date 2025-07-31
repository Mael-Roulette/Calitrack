import { View, Text } from "react-native";
import React from "react";
import GoalChart from "./GoalChart";

const GoalStats = ({
	title,
	state,
	progressHistory,
	total,
}: {
	title: string;
	state: string;
	progressHistory: number[];
	total: number;
}) => {
	const stateLabels = {
		"in-progress": "En cours",  
		finish: "validé",
	};

	const highestValue =
		progressHistory && progressHistory.length > 0
			? Math.max(...progressHistory)
			: 0;

	const progressPercentage = total > 0 ? (highestValue / total) * 100 : 0;

	return (
		<View className='px-5 py-4 border border-secondary rounded-lg mb-7'>
			<View className='flex-row items-center justify-between mb-2'>
				<Text className='text-lg font-sregular text-primary'>{title}</Text>
				<Text
					className={`text-xs font-sregular px-3 py-2 rounded-full border-[1px] border-secondary text-secondary`}
				>
					{stateLabels[state as keyof typeof stateLabels] || state}
				</Text>
			</View>
			<Text className='text-primary-100 font-sregular mb-2'>
				Record actuel : {highestValue}
			</Text>

			<GoalChart />

			<View className='flex-col justify-center items-center gap-2 mt-5'>
				<Text className='text-4xl font-calsans text-secondary text-center'>
					{progressPercentage}%
				</Text>
				<Text className='text-lg text-primary font-sregular text-center'>
					Progression
				</Text>
			</View>
		</View>
	);
};

export default GoalStats;
