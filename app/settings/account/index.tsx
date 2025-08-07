import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { updatePassword, updateUser } from "@/lib/user.appwrite";
import { useAuthStore } from "@/store";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	Alert,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const Index = () => {
	const { user, isLoading, refreshUser } = useAuthStore();
	const [newPseudo, setNewPseudo] = useState(user?.name || "");
	const [newMail, setNewMail] = useState(user?.email || "");
	const router = useRouter();

	const handleUpdateUser = async (newPseudo?: string, newMail?: string) => {
		try {
			if (!user) return;
			await updateUser({
				name: newPseudo || user.name,
				email: newMail || user.email,
			});
			await refreshUser();

			router.push("/profile");
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);

			if (errorMessage.toLowerCase().includes("email")) {
				Alert.alert(
					"Email déjà utilisé",
					"Cette adresse email est déjà utilisée. Veuillez en choisir une autre.",
					[{ text: "OK" }]
				);
			} else {
				Alert.alert(
					"Erreur",
					"Une erreur est survenue lors de la mise à jour de votre profil.",
					[{ text: "OK" }]
				);
			}
		}
	};

	const handleRecoverPassword = async () => {
		try {
			await updatePassword();

			Alert.alert(
				"Réinitialisation de mot de passe",
				"Un email de réinitialisation a été envoyé sur votre mail.",
				[{ text: "OK" }]
			);
		} catch {
			Alert.alert(
				"Erreur",
				"Une erreur est survenue lors de l'envoi de l'email de réinitialisation.",
				[{ text: "OK" }]
			);
		}
	};

	return (
		<SafeAreaView className='flex-1 px-5 bg-background'>
			{isLoading ? (
				<View className='flex-1 items-center justify-center'>
					<Text className='text-lg text-muted'>Chargement...</Text>
				</View>
			) : (
				<View className='gap-4 mb-8'>
					<View className='flex-row items-end justify-between gap-4 w-full'>
						<View className='flex-1'>
							<CustomInput
								label='Pseudo'
								value={newPseudo}
								onChangeText={(text) => setNewPseudo(text)}
								placeholder='Entrer votre pseudo'
							/>
						</View>
						<TouchableOpacity
							className='self-end aspect-square h-[50px] justify-center items-center bg-secondary rounded-md'
							accessibilityLabel='Modifier le pseudo'
							onPress={() => handleUpdateUser(newPseudo)}
							disabled={isLoading}
						>
							<Feather name='check' size={24} color='#FFF9F7' />
						</TouchableOpacity>
					</View>

					<View className='flex-row items-end justify-between gap-4 w-full'>
						<View className='flex-1'>
							<CustomInput
								label='Email'
								value={newMail}
								onChangeText={(text) => setNewMail(text)}
								placeholder='Entrer votre email'
							/>
						</View>
						<TouchableOpacity
							className='self-end aspect-square h-[50px] justify-center items-center bg-secondary rounded-md'
							accessibilityLabel='Modifier le mail'
							onPress={() => handleUpdateUser(undefined, newMail)}
							disabled={isLoading}
						>
							<Feather name='check' size={24} color='#FFF9F7' />
						</TouchableOpacity>
					</View>

					<View className="gap-3">
						<CustomInput
							label='Mot de passe'
							onChangeText={() => {}}
							placeholder='************'
							secureTextEntry={true}
							editable={false}
						/>

						<CustomButton
							title='Mail de réinitialisation'
							variant='secondary'
							onPress={() => handleRecoverPassword()}
						/>
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};

export default Index;
