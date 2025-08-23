import PricingCard from "@/components/PricingCard";
import { PRICING_PLANS } from "@/constants/premiumPlan";
import { useAuthStore } from "@/store";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const Index = () => {
	const { user } = useAuthStore();

	return (
		<SafeAreaView className='flex-1 p-5 bg-background'>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text className='indicator-text'>
					Choisissez le plan qui vous convient le mieux pour atteindre vos
					objectifs.
				</Text>

				<View className='gap-5 my-5'>
					{Object.values(PRICING_PLANS).map((plan) => (
						<PricingCard
							key={plan.id}
							plan={plan}
							currentPlan={user?.isPremium ? "premium" : "free"}
							onSelect={() => {}}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Index;
