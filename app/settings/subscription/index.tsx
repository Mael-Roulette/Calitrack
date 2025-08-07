import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import PricingCard from "@/components/PricingCard";
import { PRICING_PLANS } from "@/constants/premiumPlan";

const Index = () => {
	const [currentPlan, setCurrentPlan] = useState("free");
	const [isLoading, setIsLoading] = useState(false);

	const handleSelectPlan = async (planId: string) => {
		try {
			setIsLoading(true);
			console.log(`Selected plan: ${planId}`);
			setCurrentPlan(planId);
		} catch (error) {
			console.error("Error selecting plan:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<SafeAreaView className='flex-1 p-5 bg-background'>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text className='indicator-text'>
					Choisissez le plan qui vous convient le mieux pour atteindre vos
					objectifs.
				</Text>

				<View className='space-y-8'>
					{Object.values(PRICING_PLANS).map((plan) => (
						<PricingCard
							key={plan.id}
							plan={plan}
							currentPlan={currentPlan}
							onSelect={handleSelectPlan}
							isLoading={isLoading && currentPlan !== plan.id}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Index;
