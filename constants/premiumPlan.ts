export const PRICING_PLANS = {
	free: {
		id: "free",
		name: "Gratuit",
		price: 0,
		currency: "EUR",
		interval: "",
		features: {
			maxGoals: 4,
			maxTrainings: 6,
			importExportData: false,
			offlineAccess: true,
			earlyAccess: false,
		},
		highlights: [
			"Jusqu'à 4 objectifs",
			"Jusqu'à 6 entraînements"
		],
	},
	premium: {
		id: "premium",
		name: "Premium",
		price: 4.99,
		currency: "EUR",
		interval: "mensuel",
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
			"Import/export des données"
		],
	},
	premiumPlus: {
		id: "premiumPlus",
		name: "Premium Plus",
		price: 9.99,
		currency: "EUR",
		interval: "mensuel",
		features: {
			maxGoals: -1, // -1 indicates unlimited
			maxTrainings: -1, // -1 indicates unlimited
			importExportData: true,
			offlineAccess: true,
			earlyAccess: true,
			advancedStats: true,
		},
		highlights: [
			"Objectifs illimités",
			"Entraînements illimités",
			"Statistiques avancées",
			"Accès anticipé",
			"Import/export des données"
		],
	}
};
