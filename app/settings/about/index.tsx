import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";
import {
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { APP_VERSION } from "@/constants/value";

const Index = () => {
	const handleDeleteAccount = async () => {};

	return (
		<SafeAreaView className='bg-background flex-1'>
			<ScrollView>
				<View className='px-5 py-4'>
					<Text className='text-lg font-calsans text-primary-100'>
						Version : {APP_VERSION}
					</Text>
				</View>
				<View className='flex-col gap-6 mb-4 pt-5 first:border-t-[1px] first:border-gray-200'>
					{[
						{ title: "Mentions légales", screen: "account" },
						{ title: "Politique de confidentialité", screen: "notifications" },
						{
							title: "Conditions générales d'utilisation",
							screen: "notifications",
						},
						{ title: "Licences", screen: "notifications" },
						{ title: "Support", screen: "notifications" },
					].map((item, index) => (
						<View
							key={index}
							className='flex-row items-center justify-between pb-4 border-b-[1px] border-gray-200'
						>
							<Link
								href={`./settings/${item.screen}`}
								style={{ paddingHorizontal: 20 }}
							>
								<View className='flex-row items-center justify-between w-full'>
									<Text className='text-lg font-calsans text-primary'>
										{item.title}
									</Text>
									<Entypo
										name='chevron-small-right'
										size={24}
										color='#132541'
									/>
								</View>
							</Link>
						</View>
					))}
				</View>
				<View className='px-5'>
					<TouchableOpacity
						onPress={handleDeleteAccount}
						className='flex-row items-center py-3'
					>
						<Ionicons name='log-out-outline' size={24} color='#F43F5E' />
						<Text className='ml-3 text-lg text-rose-500 font-medium'>
							Supprimer mon compte
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Index;
