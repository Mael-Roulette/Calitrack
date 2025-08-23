import PricingCard from "@/components/PricingCard";
import { PlanManager } from "@/constants/premiumPlan";
import { useAuthStore } from "@/store";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, Alert } from "react-native";

const Index = () => {
	const { user } = useAuthStore();
	const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

	const visiblePlans = PlanManager.getVisiblePlans();

	const getCurrentPlanId = (): string => {
		// Priorité au planId spécifique, sinon fallback sur isPremium
		if (user?.planId) {
			return user.planId;
		}

		// Logique de compatibilité avec l'ancien système
		if (user?.isPremium) {
			return "premium"; // Plan par défaut pour les utilisateurs premium existants
		}

		return "free";
	};

	const handlePlanSelection = async (planId: string) => {
		const currentPlan = getCurrentPlanId();

		// Éviter la sélection du plan actuel
		if (currentPlan === planId) {
			Alert.alert("Information", "Vous utilisez déjà ce plan.");
			return;
		}

		try {
			setLoadingPlan(planId);

			const selectedPlan = PlanManager.getPlan(planId);
			const currentPlanObj = PlanManager.getPlan(currentPlan);

			if (!selectedPlan) {
				throw new Error("Plan sélectionné introuvable");
			}

			console.log(`Changement de plan: ${currentPlan} → ${planId}`);

			// Logique métier selon le type de changement
			if (selectedPlan.price === 0) {
				// Retour au plan gratuit
				Alert.alert(
					"Confirmation",
					"Êtes-vous sûr de vouloir revenir au plan gratuit ? Vous perdrez l'accès aux fonctionnalités premium.",
					[
						{ text: "Annuler", style: "cancel" },
						{
							text: "Confirmer",
							style: "destructive",
							onPress: () => processDowngrade(planId),
						},
					]
				);
			} else if (PlanManager.canUpgradeTo(currentPlan, planId)) {
				// Upgrade vers un plan supérieur
				await processUpgrade(planId);
			} else {
				// Changement entre plans payants
				await processPlanChange(planId);
			}
		} catch (error) {
			console.error("Erreur lors du changement de plan:", error);
			Alert.alert(
				"Erreur",
				"Une erreur s'est produite lors du changement de plan. Veuillez réessayer."
			);
		} finally {
			setLoadingPlan(null);
		}
	};

	const processUpgrade = async (planId: string) => {
		// TODO: Intégrer avec votre service de paiement
		// Exemple : await initiatePayment(PlanManager.getPlan(planId));

		// Simulation
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const plan = PlanManager.getPlan(planId);
		Alert.alert(
			"Upgrade réussi !",
			`Vous êtes maintenant sur le plan ${plan?.name}. Profitez de toutes les nouvelles fonctionnalités !`
		);
	};

	const processDowngrade = async (planId: string) => {
		// TODO: Traiter la rétrogradation
		// Exemple : await cancelSubscription();

		await new Promise((resolve) => setTimeout(resolve, 1500));

		Alert.alert("Plan modifié", "Vous êtes maintenant sur le plan gratuit.");
	};

	const processPlanChange = async (planId: string) => {
		// TODO: Traiter le changement entre plans payants
		// Exemple : await changeSubscriptionPlan(planId);

		await new Promise((resolve) => setTimeout(resolve, 2000));

		const plan = PlanManager.getPlan(planId);
		Alert.alert(
			"Plan modifié",
			`Vous êtes maintenant sur le plan ${plan?.name}.`
		);
	};

	return (
		<SafeAreaView className='flex-1 p-5 bg-background'>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* En-tête */}
				<View className='mb-6'>
					<Text className='text-2xl font-calsans text-primary mb-2'>
						Choisissez votre plan
					</Text>
					<Text className='indicator-text'>
						Sélectionnez le plan qui correspond le mieux à vos besoins pour
						atteindre vos objectifs.
					</Text>
				</View>

				{/* Informations du plan actuel */}
				{getCurrentPlanId() !== "free" && (
					<View className='mb-4 p-4 bg-green-50 border border-green-200 rounded-lg'>
						<Text className='font-semibold text-green-800 mb-1'>
							Plan actuel : {PlanManager.getPlan(getCurrentPlanId())?.name}
						</Text>
						<Text className='text-sm text-green-600'>
							{user?.subscriptionEnd
								? `Expire le ${new Date(user.subscriptionEnd).toLocaleDateString("fr-FR")}`
								: "Actif"}
						</Text>
					</View>
				)}

				{/* Liste des plans */}
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

				{/* Section informative */}
				<View>
					<Text className='indicator-text text-center mb-2'>
						💡 Vous pouvez changer de plan à tout moment dans vos paramètres
					</Text>
					<Text className='indicator-text text-center'>
						Questions ? Contactez notre support
					</Text>
				</View>

				{/* Avantages Premium (si utilisateur gratuit) */}
				{getCurrentPlanId() === "free" && (
					<View className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
						<Text className='font-semibold text-blue-800 mb-2'>
							🚀 Pourquoi passer Premium ?
						</Text>
						<Text className='text-sm text-blue-600'>
							• Plus d&apos;objectifs et d&apos;entraînements{"\n"}• Accès aux nouvelles
							fonctionnalités en avant-première{"\n"}• Import/export de vos
							données{"\n"}
						</Text>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Index;
