import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddTraining = () => {
	return (
		<SafeAreaView className='px-5 pt-16 bg-background min-h-full'>
			<View className='mb-8 flex-row items-center justify-start'>
				<Link href={"/goals"} className='mr-4'>
					<AntDesign name='caretleft' size={24} color='#132541' />
				</Link>
				<Text className='text-3xl text-primary font-calsans'>
					Ajouter un objectif
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default AddTraining;
