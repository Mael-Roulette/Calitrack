import { View, Text } from "react-native";
import React from "react";
import PrimaryGradient from "./PrimaryGradient";

const ProgressOverview = () => {
	return (
		<PrimaryGradient>
			<View className='w-full p-5 flex-col gap-5'>
				<Text className='text-2xl text-background font-calsans'>
					Progression générale
				</Text>
				<View className='w-full flex-row gap-3'>
					<View className='flex-1 h-full bg-background/20 rounded-lg p-4 flex-col gap-1'>
						<Text className='text-3xl text-background font-calsans'>12</Text>
						<Text className='text-base text-background font-sregular'>
							Séances complétées
						</Text>
					</View>

					<View className='flex-1 h-full bg-background/20 rounded-lg p-4 flex-col gap-1'>
						<Text className='text-3xl text-background font-calsans'>3</Text>
						<Text className='text-base text-background font-sregular'>
							Objectifs atteints
						</Text>
					</View>
				</View>
			</View>
		</PrimaryGradient>
	);
};

export default ProgressOverview;
