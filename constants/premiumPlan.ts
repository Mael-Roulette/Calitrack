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
			offlineAccess: false,
			earlyAccess: false,
		},
		highlights: ["4 objectifs", "6 entraînements"],
	},
	premium: {
		id: "premium",
		name: "Premium",
		price: 4.99,
		currency: "EUR",
		interval: "monthly",
		features: {
			maxGoals: 12,
			maxTrainings: 20,
			importExportData: true,
			offlineAccess: true,
			earlyAccess: true,
		},
		highlights: ["12 objectifs", "20 entraînements"],
	},
};
