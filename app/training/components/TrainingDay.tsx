import PrimaryGradient from "@/components/PrimaryGradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const TrainingDay = ({
	id,
	name,
	duration,
}: {
	id: string;
	name: string;
	duration: number;
}) => {
	const goToTraining = ({ id }: { id: string }) => {
		router.push(`/training/${id}`);
	};

	return (
		<PrimaryGradient style={{}}>
			<View className='bg-primary-gradient px-5 py-4 gap-5'>
				<View className='flex-row justify-between items-center gap-12'>
					<Text className='text-background font-sregular text-xl flex-1 capitalize-first'>
						{name}
					</Text>
					<View className='flex-row items-center gap-2'>
						<Ionicons name='time-sharp' size={24} color='#FFF9F7' />
						<Text className='text-background font-sregular text-base'>
							{duration < 60
								? `${duration} minutes`
								: `${Math.floor(duration / 60)}h${duration % 60 === 0 ? "" : duration % 60}`}
						</Text>
					</View>
				</View>

				<TouchableOpacity
					className={`flex-row items-center justify-center rounded-lg py-3 px-6 gap-4 bg-background`}
					onPress={() => goToTraining({ id })}
				>
					<AntDesign name='caretright' size={22} color='#FC7942' />
					<Text className='text-secondary font-sregular text-base'>
						Lancer ma séance
					</Text>
				</TouchableOpacity>
			</View>
		</PrimaryGradient>
	);
};

export default TrainingDay;
