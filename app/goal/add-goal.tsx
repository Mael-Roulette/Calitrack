import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { useGoalsStore } from "@/store";
import { GoalState } from "@/type";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";
import { createGoal } from "@/lib/goal.appwrite";

const AddGoal = () => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const [form, setForm] = useState<GoalState>({
		title: "",
		type: "hold",
		total: "",
		progress: 0,
	});
	const { fetchUserGoals } = useGoalsStore();
	const router = useRouter();

	const submit = async (): Promise<void> => {
		if (!form.title || !form.type || !form.total) {
			Alert.alert("Erreur", "Veuillez remplir tous les champs");
			return;
		}

		const { title, type, total, progress } = form;


		try {
			setIsSubmitting(true);
			await createGoal({
				title: title,
				type: type,
				progress: progress || 0,
				total: parseInt(total),
			});

			await fetchUserGoals();

			router.push("/goals");
		} catch (err) {
			console.error(err);
			Alert.alert("Erreur", "Échec de l'ajout. Veuillez réessayer.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className='bg-background min-h-full'>
			<ScrollView className='px-5'>
				<View className='gap-5 h-full'>
					<CustomInput
						label="Nom de l'objectif"
						value={form.title}
						placeholder='10s straddle planche'
						onChangeText={(text) =>
							setForm((prev) => ({ ...prev, title: text }))
						}
					/>
					<View>
						<Text className='font-sregular text-xl mb-2'>
							Type d&apos;objectif
						</Text>
						<View
							style={{
								borderWidth: 1,
								borderColor: "#617188",
								borderRadius: 8,
								overflow: "hidden",
							}}
						>
							<Picker
								selectedValue={form.type}
								onValueChange={(itemValue) =>
									setForm((prev) => ({
										...prev,
										type: itemValue as "hold" | "reps",
									}))
								}
								style={{ backgroundColor: "#FFF9F7", paddingLeft: 16 }}
							>
								<Picker.Item label='Statique' value='hold' />
								<Picker.Item label='Dynamique' value='reps' />
							</Picker>
						</View>
					</View>
					<CustomInput
						label='Max à atteindre'
						value={form.total}
						placeholder='10'
						keyboardType='numeric'
						onChangeText={(number) =>
							setForm((prev) => ({ ...prev, total: number }))
						}
					/>
					<CustomInput
						label='Max actuel'
						value={form.progress as any as string}
						placeholder='2'
						keyboardType='numeric'
						onChangeText={(number) =>
							setForm((prev) => ({
								...prev,
								progress: number ? parseInt(number) : 0,
							}))
						}
					/>
				</View>

				<CustomButton
					title="Ajouter l'objectif"
					onPress={submit}
					isLoading={isSubmitting}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default AddGoal;
