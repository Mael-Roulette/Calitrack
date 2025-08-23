// app/settings/subscription/index.tsx
import PricingCard from "@/components/PricingCard";
import { PlanManager } from "@/constants/premiumPlan";
import { useAuthStore } from "@/store";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, Alert } from "react-native";

const Index = () => {
	const { user } = useAuthStore();
	const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

	const visiblePlans = PlanManager.getVisiblePlans();

	const handlePlanSelection = async (planId: string) => {

	};

	const getCurrentPlanId = (): string => {
		return user?.planId ?? "free";
	};

	return (
		<SafeAreaView className='flex-1 p-5 bg-background'>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className='mb-6'>
					<Text className='text-2xl font-calsans text-primary mb-2'>
						Choisissez votre plan
					</Text>
					<Text className='indicator-text'>
						Sélectionnez le plan qui correspond le mieux à vos besoins pour
						atteindre vos objectifs.
					</Text>
				</View>

				<View className='gap-5 my-5'>
					{visiblePlans.map((plan) => (
						<PricingCard
							key={plan.id}
							plan={plan}
							currentPlan={getCurrentPlanId()}
							onSelect={handlePlanSelection}
							isLoading={loadingPlan === plan.id}
							disabled={loadingPlan !== null && loadingPlan !== plan.id}
						/>
					))}
				</View>

				{/* Section informative optionnelle */}
				<View className='mt-8 p-4 bg-gray-50 rounded-lg'>
					<Text className='text-sm text-gray-600 text-center'>
						Vous pouvez changer de plan à tout moment dans vos paramètres.
						{"\n"}
						Questions ? Contactez notre support.
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Index;
