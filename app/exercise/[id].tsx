import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	ActivityIndicator,
	Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { getExericseById } from "@/lib/exercise.appwrite";
import { isLoading } from "expo-font";

const ExerciseDetails = () => {
	const { id } = useLocalSearchParams();
	const [exercise, setExercise] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const navigation = useNavigation();

	useEffect(() => {
		const fetchExercise = async () => {
			setLoading(true);
			try {
				const response = await getExericseById(id as string);
				setExercise(response);
			} catch (error) {
				console.error("Erreur lors de la récupération de l'exercice", error);
				router.push("/exercise/exercise-list");
			} finally {
				setLoading(false);
			}
		};
		fetchExercise();
	}, [id, router]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<Text
					className='title-2 text-ellipsis overflow-hidden max-w-60'
					numberOfLines={1}
				>
					{exercise?.Name || "Exercice"}
				</Text>
			),
		});
	}, [exercise]);
	return (
		<SafeAreaView className='flex-1 bg-background'>
			{loading ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size='large' color='#0000ff' />
					<Text>Chargement...</Text>
				</View>
			) : (
				<ScrollView>
					{exercise.Image && (
						<View className='bg-secondary p-4 rounded-b-md'>
							<Image source={{ uri: exercise.Image }} />
						</View>
					)}
          <View className="px-5 py-2">
            <View className="flex-row items-center justify-between">
              <Text className="text">
                Type : <Text className="text-secondary">{exercise.Type}</Text>
              </Text>
              <Text className="text">
                Difficulté : <Text className="text-secondary">{exercise.Difficulty}</Text>
              </Text>
            </View>
            <Text className="text mt-2">{exercise.Description}</Text>
          </View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default ExerciseDetails;
