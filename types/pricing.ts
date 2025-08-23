export interface PricingPlan {
	id: string;
	name: string;
	price: number;
	currency: string;
	interval: string;
	description?: string;
	features: {
		maxGoals: number;
		maxTrainings: number;
		importExportData: boolean;
		offlineAccess: boolean;
		earlyAccess: boolean;
	};
	highlights: string[];
}

export interface PricingCardProps {
	plan: PricingPlan;
	currentPlan?: string;
	onSelect: (planId: string) => void;
	isLoading?: boolean;
	disabled?: boolean;
}