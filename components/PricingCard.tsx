import { PricingCardProps } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const PricingCard: React.FC<PricingCardProps> = ({
	plan,
	currentPlan,
	onSelect,
	isLoading = false,
	disabled = false,
}) => {
	const isCurrentPlan = currentPlan === plan.id;
	const isFree = plan.price === 0;

	const getButtonText = () => {
		if (isCurrentPlan) return "Plan actuel";
		if (isFree) return "Continuer gratuitement";
		return currentPlan === "free" ? "Passer Premium" : "Changer de plan";
	};

	const getFeatureIcon = (hasFeature: boolean | number) => {
		if (typeof hasFeature === "number" && hasFeature === -1) {
			return <Ionicons name='infinite' size={16} color='#10B981' />;
		}
		return (
			<Ionicons
				name={hasFeature ? "checkmark-circle" : "close-circle"}
				size={16}
				color={hasFeature ? "#10B981" : "#EF4444"}
			/>
		);
	};

	const renderFeatures = () => {
		const featureList = [
			{
				label:
					plan.features.maxGoals === -1
						? "Objectifs illimités"
						: `${plan.features.maxGoals} objectifs max`,
				value: plan.features.maxGoals > 0 || plan.features.maxGoals === -1,
			},
			{
				label:
					plan.features.maxTrainings === -1
						? "Entraînements illimités"
						: `${plan.features.maxTrainings} entraînements max`,
				value:
					plan.features.maxTrainings > 0 || plan.features.maxTrainings === -1,
			},
			{
				label: "Statistiques avancées",
				value: plan.features.advancedStats,
			},
			{
				label: "Exercices personnalisés",
				value: plan.features.customExercises,
			},
			{
				label: "Export des données",
				value: plan.features.exportData,
			},
			{
				label: "Support prioritaire",
				value: plan.features.prioritySupport,
			},
		];

		return featureList.map((feature, index) => (
			<View key={index} className='flex-row items-center gap-3 mb-2'>
				{getFeatureIcon(feature.value)}
				<Text
					className={`font-sregular ${
						feature.value ? "text-primary" : "text-primary-100"
					}`}
				>
					{feature.label}
				</Text>
			</View>
		));
	};

	const CardContent = () => (
		<View className='relative p-6 bg-background border border-secondary rounded-md'>
			{/* Badge plan actuel */}
			{isCurrentPlan && (
				<View className='absolute -top-3 right-4 z-10'>
					<View className='bg-green-500 px-3 py-1 rounded-full'>
						<Text className='text-white font-semibold text-xs'>✓ ACTUEL</Text>
					</View>
				</View>
			)}

			{/* Header */}
			<View className='mb-6'>
				<Text className='font-calsans text-2xl text-primary mb-2'>
					{plan.name}
				</Text>

				<View className='flex-row items-baseline gap-1 mb-2'>
					<Text className='font-calsans text-4xl text-secondary'>
						{isFree ? "Gratuit" : `${plan.price.toFixed(0)}€`}
					</Text>
					{!isFree && (
						<Text className='font-sregular text-primary-100'>
							/{plan.interval === "monthly" ? "mois" : "an"}
						</Text>
					)}
				</View>

				{plan.description && (
					<Text className='text-primary-100 font-sregular'>
						{plan.description}
					</Text>
				)}
			</View>

			{/* Highlights */}
			{plan.highlights && plan.highlights.length > 0 && (
				<View className='mb-6'>
					{plan.highlights.map((highlight, index) => (
						<View key={index} className='flex-row items-center gap-3 mb-2'>
							<Ionicons name='star' size={16} color='#FC7942' />
							<Text className='font-semibold text-primary'>{highlight}</Text>
						</View>
					))}
				</View>
			)}

			{/* Features détaillées */}
			<View className='mb-8'>
				<Text className='font-semibold text-primary mb-4'>
					Fonctionnalités incluses :
				</Text>
				{renderFeatures()}
			</View>

			{/* Bouton d'action */}
			<TouchableOpacity
				onPress={() => !disabled && !isCurrentPlan && onSelect(plan.id)}
				disabled={disabled || isCurrentPlan || isLoading}
				activeOpacity={0.8}
				className={`w-full py-4 rounded-xl ${
					isCurrentPlan
						? "bg-gray-200 border border-gray-300"
						: disabled || isLoading
							? "bg-gray-100 border border-gray-200"
							: "bg-secondary"
				}`}
			>
				{isLoading ? (
					<ActivityIndicator color={isCurrentPlan ? "#6B7280" : "#FFF9F7"} />
				) : (
					<Text
						className={`text-center font-semibold ${
							isCurrentPlan ? "text-gray-600" : "text-background"
						}`}
					>
						{getButtonText()}
					</Text>
				)}
			</TouchableOpacity>
		</View>
	);
  
	return <CardContent />;
};

export default PricingCard;
