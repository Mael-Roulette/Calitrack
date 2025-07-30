import GoalStats from "@/components/GoalStats";
import ProgressOverview from "@/components/ProgressOverview";
import { icons } from "@/constants/icons";
import { useAuthStore, useGoalsStore } from "@/store";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";

const Profile = () => {
	const { user, isLoading } = useAuthStore();
	const { goals } = useGoalsStore();

	console.log( goals );

	return (
		<SafeAreaView className='px-5 pt-16 bg-background flex-1'>
			{isLoading ? (
				<View>
					<Text className='text-xl font-calsans text-primary'>
						Chargement...
					</Text>
				</View>
			) : (
				<ScrollView>
					<View className='mb-8 flex-row items-center justify-between'>
						<Text className='title'>Profil</Text>
						<Link href={"/settings"} className='mr-4'>
							<Ionicons name='settings-outline' size={30} color='#132541' />
						</Link>
					</View>

					<View className=' flex-col items-center justify-center w-full mb-8'>
						<View className='w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden'>
							{user?.avatar ? (
								<Image
									source={{ uri: user.avatar }}
									className='w-full h-full'
									resizeMode='cover'
								/>
							) : (
								<View className='w-full h-full items-center justify-center'>
									<Ionicons name='person' size={50} color='#132541' />
								</View>
							)}
						</View>
						<View>
							<Link
								href={"/settings/account"}
								className='flex-row items-center h-8'
							>
								<Text className='text-2xl font-calsans text-primary'>
									{user?.name || "Utilisateur"}
								</Text>
								<View style={{ width: 10 }} />
								<Feather name='edit-3' size={20} color='#132541' />
							</Link>
						</View>
					</View>

					<ProgressOverview />

					<View className="mt-8">
						<View className="flex-row items-center gap-4 mb-5">
							<Image source={icons.stats} style={{ width: 30, height: 30 }} />
							<Text className='text-2xl text-primary font-calsans'>
								Mes stats
							</Text>
						</View>

						<GoalStats />
					</View>
				</ScrollView>
			)}
		</SafeAreaView>
	);
};

export default Profile;
