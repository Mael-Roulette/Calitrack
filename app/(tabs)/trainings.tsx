import { useTrainingsStore } from "@/store";
import { Training } from "@/type";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
	Alert,
	FlatList,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import TrainingItem from "../training/components/TrainingItem";

const Trainings = () => {
	const { trainings } = useTrainingsStore();
	const router = useRouter();

	const renderTrainingItem = ({ item }: { item: Training }) => (
		<TrainingItem id={item.$id} title={item.Name} duration={item.Duration} />
	);

	const handleAddTrainingLink = () => {
		if (trainings.length >= 10) {
			Alert.alert(
				"Limite atteinte",
				"Vous ne pouvez pas ajouter plus de 10 entrainements."
			);
		} else {
			router.push("/training/add-training");
		}
	};

	return (
		<SafeAreaView className='px-5 pt-16 bg-background flex-1'>
			<View className='mb-2 flex-row items-center justify-between'>
				<Text className='title'>Mes entrainements</Text>
				<TouchableOpacity onPress={handleAddTrainingLink} className='mr-4'>
					<Ionicons name='add-circle-outline' size={30} color='#132541' />
				</TouchableOpacity>
			</View>

			<View className='mb-6'>
				<Text className='text-primary-100 italic'>
					Nombre d&apos;entrainements : {trainings.length}/10.
				</Text>
			</View>

			<View className='flex-1'>
				<FlatList
					data={trainings}
					renderItem={renderTrainingItem}
					keyExtractor={(item) => item.$id || item.Name}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={
						<Text className='text-primary-100 italic text-lg mt-5'>
							Aucun entrainement
						</Text>
					}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Trainings;
