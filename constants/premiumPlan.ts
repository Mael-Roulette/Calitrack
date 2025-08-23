// constants/premiumPlan.ts
import { PricingPlans, PricingPlan } from "@/types";

// Configuration centralisée des plans
export const PRICING_PLANS: PricingPlans = {
	free: {
		id: "free",
		name: "Gratuit",
		price: 0,
		currency: "EUR",
		interval: "",
		order: 1,
		features: {
			maxGoals: 4,
			maxTrainings: 6,
			importExportData: false,
			offlineAccess: true,
			earlyAccess: false,
		},
		highlights: ["Jusqu'à 4 objectifs", "Jusqu'à 6 entraînements"],
		description: "Parfait pour débuter",
	},
	premium: {
		id: "premium",
		name: "Premium",
		price: 4.99,
		currency: "EUR",
		interval: "monthly",
		order: 2,
		badge: "POPULAIRE",
		features: {
			maxGoals: 12,
			maxTrainings: 20,
			importExportData: true,
			offlineAccess: true,
			earlyAccess: true,
		},
		highlights: [
			"Jusqu'à 12 objectifs",
			"Jusqu'à 20 entraînements",
			"Accès anticipé",
			"Import/export des données",
		],
		description: "Le meilleur rapport qualité-prix",
	},
	premiumPlus: {
		id: "premiumPlus",
		name: "Premium Plus",
		price: 9.99,
		currency: "EUR",
		interval: "monthly",
		order: 3,
		features: {
			maxGoals: -1,
			maxTrainings: -1,
			importExportData: true,
			offlineAccess: true,
			earlyAccess: true,
			advancedStats: true,
			prioritySupport: true,
		},
		highlights: [
			"Objectifs illimités",
			"Entraînements illimités",
			"Statistiques avancées",
			"Support prioritaire",
		],
		description: "Pour les utilisateurs avancés",
	},
};

// Utilitaires pour la gestion des plans
export class PlanManager {
	// Obtenir les plans visibles triés par ordre
	static getVisiblePlans(): PricingPlan[] {
		return Object.values(PRICING_PLANS)
			.filter((plan) => plan.isVisible !== false)
			.sort((a, b) => (a.order || 0) - (b.order || 0));
	}

	// Obtenir un plan par ID
	static getPlan(planId: string): PricingPlan | undefined {
		return PRICING_PLANS[planId];
	}

	// Vérifier si un plan a une fonctionnalité
	static hasFeature(planId: string, featureKey: string): boolean {
		const plan = this.getPlan(planId);
		if (!plan) return false;

		const featureValue = plan.features[featureKey];
		if (typeof featureValue === "boolean") return featureValue;
		if (typeof featureValue === "number")
			return featureValue > 0 || featureValue === -1;
		return !!featureValue;
	}

	// Comparer deux plans
	static comparePlans(
		planId1: string,
		planId2: string
	): {
		betterFeatures: string[];
		worseFeatures: string[];
		sameFeatures: string[];
	} {
		const plan1 = this.getPlan(planId1);
		const plan2 = this.getPlan(planId2);

		if (!plan1 || !plan2) {
			return { betterFeatures: [], worseFeatures: [], sameFeatures: [] };
		}

		const betterFeatures: string[] = [];
		const worseFeatures: string[] = [];
		const sameFeatures: string[] = [];

		const allFeatures = new Set([
			...Object.keys(plan1.features),
			...Object.keys(plan2.features),
		]);

		allFeatures.forEach((feature) => {
			const value1 = plan1.features[feature];
			const value2 = plan2.features[feature];

			if (value1 === value2) {
				sameFeatures.push(feature);
			} else if (this.isFeatureBetter(value1, value2)) {
				betterFeatures.push(feature);
			} else {
				worseFeatures.push(feature);
			}
		});

		return { betterFeatures, worseFeatures, sameFeatures };
	}

	private static isFeatureBetter(value1: any, value2: any): boolean {
		// -1 (illimité) est toujours mieux qu'un nombre positif
		if (value1 === -1 && typeof value2 === "number" && value2 > 0) return true;
		if (value2 === -1 && typeof value1 === "number" && value1 > 0) return false;

		// Pour les booléens, true est mieux que false
		if (typeof value1 === "boolean" && typeof value2 === "boolean") {
			return value1 && !value2;
		}

		// Pour les nombres, plus grand est mieux (sauf -1 qui est géré plus haut)
		if (typeof value1 === "number" && typeof value2 === "number") {
			return value1 > value2;
		}

		return false;
	}

	// Ajouter un nouveau plan (utile pour les tests ou l'administration)
	static addPlan(plan: PricingPlan): void {
		PRICING_PLANS[plan.id] = plan;
	}

	// Modifier un plan existant
	static updatePlan(planId: string, updates: Partial<PricingPlan>): boolean {
		if (!PRICING_PLANS[planId]) return false;

		PRICING_PLANS[planId] = {
			...PRICING_PLANS[planId],
			...updates,
			features: {
				...PRICING_PLANS[planId].features,
				...(updates.features || {}),
			},
		};
		return true;
	}

	// Masquer/afficher un plan
	static togglePlanVisibility(planId: string, isVisible: boolean): boolean {
		return this.updatePlan(planId, { isVisible });
	}
}

// Export par défaut pour compatibilité
export default PRICING_PLANS;
