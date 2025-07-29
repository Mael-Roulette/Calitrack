import PrimaryGradient from "@/components/PrimaryGradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const TrainingDay = ({
	id,
	title,
	duration,
}: {
	id: string;
	title: string;
	duration: number;
}) => {
	const goToTraining = ({ id }: { id: string }) => {
		router.push(`./training/${id}`);
	};

	return (
		<PrimaryGradient style={{}}>
			<View className='bg-primary-gradient px-5 py-4 gap-5'>
				<Text className='text-background text-xl font-calsans'>
					Entrainement du jour
				</Text>

				<View className='flex-row justify-between items-center gap-12'>
					<Text className='text-background font-sregular text-lg flex-1'>
						{title}
					</Text>
					<View className='flex-row items-center gap-2'>
						<Ionicons name='time-sharp' size={24} color='#FFF9F7' />
						<Text className='text-background font-sregular text-base'>
							{duration} minutes
						</Text>
					</View>
				</View>

				<TouchableOpacity
					className={`flex-row items-center justify-center rounded-lg py-3 px-6 gap-4 bg-background`}
					onPress={() => goToTraining({ id })}
				>
					<AntDesign name='caretright' size={22} color='#FC7942' />
					<Text className='text-secondary font-sregular text-base'>
						Voir ma séance
					</Text>
				</TouchableOpacity>
			</View>
		</PrimaryGradient>
	);
};

export default TrainingDay;
