import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { getTrainingById } from "@/lib/appwrite";
import { AntDesign } from "@expo/vector-icons";

const Edit = () => {
	const { id } = useLocalSearchParams();
	const [training, setTraining] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const navigation = useNavigation();

	useEffect(() => {
		const fetchTraining = async () => {
			setLoading(true);

			try {
				const response = await getTrainingById(id as string);
				setTraining(response);
			} catch (error) {
				console.error(
					"Erreur lors de la récupération de l'entrainement",
					error
				);
				router.push("/trainings");
			} finally {
				setLoading(false);
			}
		};

		fetchTraining();
	}, [id, router]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<Text
					className='title text-ellipsis overflow-hidden max-w-60'
					numberOfLines={1}
				>
					Modifier : {training?.Name || "Entrainement"}
				</Text>
			),
		});
	}, [navigation, training, id, router]);
	return (
		<SafeAreaView className='bg-background min-h-full px-5'>
			{loading ? (
				<View className='flex-1 justify-center items-center'>
					<ActivityIndicator size='large' color='#FC7942' />
					<Text className='mt-2 text-primary'>Chargement...</Text>
				</View>
			) : (
				<View>
          
        </View>
			)}
		</SafeAreaView>
	);
};

export default Edit;
