import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomCalendar from "../calendar/components/CustomCalendar";
import TrainingDay from "../training/components/TrainingDay";
import TrainingItem from "../training/components/TrainingItem";

const Calendar = () => {
	return (
		<SafeAreaView className='px-5 pt-16 bg-background flex-1'>
			<ScrollView>
				<View className='mb-8 flex-row items-center justify-between'>
					<Text className='title'>Calendrier</Text>
					<Link href={'/'} className='mr-4'>
						<Feather name='edit-3' size={30} color='#132541' />
					</Link>
				</View>

				<CustomCalendar />

				<View className='mt-10'>
					<TrainingDay id={"1"} title={"Jour planche + combo"} duration={45} />
				</View>

				<View className='mt-5'>
					<Text className='text-xl text-primary font-calsans mb-3'>Demain</Text>
					<TrainingItem
						id={"1"}
						title={"front lever"}
						level={"beginner"}
						duration={30}
					/>
					<Text className='text-xl text-primary font-calsans mb-3'>
						Jeudi 31 Juillet
					</Text>
					<TrainingItem
						id={"2"}
						title={"Planche + combo"}
						level={"advance"}
						duration={80}
					/>
				</View>
				<View className='mb-5'>
					<Link href={"/training"} className='text-primary font-sregular underline underline-offset-2 text-center'>Voir tous les entrainements</Link>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Calendar;
