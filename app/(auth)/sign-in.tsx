import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({ email: "", password: "" });

	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert("Erreur", "Veuillez remplir tous les champs");
			return;
		}

		const { email, password } = form;

		setIsSubmitting(true);
		try {
			await signIn({
				email,
				password,
			});
		} catch (error) {
			console.error(error);
			Alert.alert("Erreur", "Échec de la connexion. Veuillez réessayer.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<View className='px-5 py-10'>
			<View className='gap-8 flex-1'>
				<Text className='text-3xl font-calsans text-primary'>Me Connecter</Text>

				<View className='gap-6'>
					<CustomInput
						placeholder='Entrer votre email'
						value={form.email}
						onChangeText={(text) =>
							setForm((prev) => ({ ...prev, email: text }))
						}
						label='Email'
						keyboardType='email-address'
					/>

					<View className='gap-2'>
						<CustomInput
							placeholder='Entrer votre mot de passe'
							value={form.password}
							onChangeText={(text) =>
								setForm((prev) => ({ ...prev, password: text }))
							}
							label='Password'
							secureTextEntry={true}
						/>
					</View>
					<CustomButton
						title='Connexion'
						onPress={submit}
						isLoading={isSubmitting}
					/>
				</View>
			</View>

			<View className='mt-6 mb-4'>
				<Text className='text-center text-primary font-sregular'>
					Vous n&apos;avez pas encore de compte ?{" "}
					<Link href='/sign-up' className='text-secondary'>
						S&apos;inscrire
					</Link>
				</Text>
			</View>
		</View>
	);
};

export default SignIn;
