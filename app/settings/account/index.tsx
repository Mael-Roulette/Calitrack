import { View, Text, SafeAreaView, Switch } from "react-native";
import React from "react";
import { useAuthStore } from "@/store";
import CustomInput from "@/components/CustomInput";

const Index = () => {
	const { user, isLoading } = useAuthStore();

	return (
		<SafeAreaView className='flex-1 px-5 bg-background'>
			{isLoading ? (
				<View className='flex-1 items-center justify-center'>
					<Text className='text-lg text-muted'>Chargement...</Text>
				</View>
			) : (
				<View className="gap-4 mb-8">
					<CustomInput
						label='Pseudo'
						value={user?.name || ""}
						onChangeText={() => {}}
						placeholder='Entrer votre pseudo'
					/>

          <CustomInput
						label='Email'
						value={user?.email || ""}
						onChangeText={() => {}}
						placeholder='Entrer votre email'
					/>

          <CustomInput
						label='Mot de passe'
						onChangeText={() => {}}
						placeholder='************'
            secureTextEntry={true}
            editable={false}
					/>

					<View className='border border-secondary gap-4 p-4 rounded-md'>
						<Text className='text-lg'>
							Authentification à deux facteurs (A2F)
						</Text>
						<Switch value={true} />
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};

export default Index;
