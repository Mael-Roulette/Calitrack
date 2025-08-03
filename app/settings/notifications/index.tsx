import { View, Text, SafeAreaView, Switch } from "react-native";
import React from "react";

const Index = () => {
	return (
		<SafeAreaView className='flex-1 px-5 bg-background'>
			<View className='mb-8'>
				<Text className='text-primary font-calsans text-xl'>Entrainements</Text>
				<View className='flex-row items-center justify-between'>
					<Text className='text-lg'>
						Authentification à deux facteurs (A2F)
					</Text>
					<Switch />
				</View>
			</View>
			<View>
				<Text className='text-primary font-calsans text-xl'>Objectfis</Text>
			</View>
		</SafeAreaView>
	);
};

export default Index;
