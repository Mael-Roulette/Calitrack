import { View, Text, SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

const Training = () => {
	return (
		<SafeAreaView className='px-5 pt-16 bg-background flex-1'>
			<View className='mb-8 flex-row items-center justify-between'>
				<Text className='text-3xl text-primary font-calsans'>
					Mes entrainements
				</Text>
				<Link href={'/training/add-training'} className='mr-4'>
					<Ionicons name='add-circle-outline' size={30} color='#132541' />
				</Link>
			</View>
		</SafeAreaView>
	);
};

export default Training;
