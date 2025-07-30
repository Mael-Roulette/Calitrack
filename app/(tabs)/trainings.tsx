import { View, Text, SafeAreaView, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useTrainingsStore } from "@/store";
import { Training } from "@/type";
import TrainingItem from "../training/components/TrainingItem";

const Trainings = () => {
	const { trainings } = useTrainingsStore();

	const renderTrainingItem = ({ item }: { item: Training }) => (
		<TrainingItem id={item.$id} title={item.Name} duration={item.Duration} />
	);

	return (
		<SafeAreaView className='px-5 pt-16 bg-background flex-1'>
			<View className='mb-8 flex-row items-center justify-between'>
				<Text className='title'>
					Mes entrainements
				</Text>
				<Link href={"/training/add-training"} className='mr-4'>
					<Ionicons name='add-circle-outline' size={30} color='#132541' />
				</Link>
			</View>

			<View>
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
