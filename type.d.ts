import { Models } from "react-native-appwrite";

export interface User extends Models.Document {
	name: string;
	email: string;
	avatar: string;
	completedTrainings?: number;
	isPremium?: boolean;
	subscriptionStart?: DateTime;
	subscriptionEnd?: DateTime;
	subscriptionProvider?: "stripe" | "apple" | "google";
}

interface TabBarIconProps {
	icon: ImageSourcePropType;
}

interface CustomButtonProps {
	onPress?: () => void;
	title?: string;
	customStyles?: string;
	textStyles?: string;
	isLoading?: boolean;
	variant?: "primary" | "secondary";
}

interface CustomInputProps {
	placeholder?: string;
	value?: string;
	onChangeText?: (text: string) => void;
	label: string;
	secureTextEntry?: boolean;
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
	editable?: boolean;
	customStyles?: string;
}

interface CustomTagsProps {
	label: string;
	placeholder: string;
	suggestions?: TagOption[] | string[];
	value?: string[];
	onChangeText?: (values: string[]) => void;
	maxTags?: number;
	allowCustomTags?: boolean;
}

interface TagOption {
	label: string;
	value: string;
}

interface CreateUserParams {
	email: string;
	password: string;
	name: string;
}

interface SignInParams {
	email: string;
	password: string;
}

interface Goal {
	$createdAt: string;
	$updatedAt: string;
	$id?: string;
	title: string;
	type: any;
	progress: number;
	total: number;
	progressHistory: [];
	state?: "in-progress" | "finish";
}

interface GoalState {
	title: string;
	type: "push" | "pull";
	total: string;
	progress: number;
}

interface createGoalParams {
	title: string;
	type: "push" | "pull";
	progress?: number;
	total: number;
}

interface updatedGoalParams {
	$id?: string;
	updateDate: string;
	progress: number;
	state?: "in-progress" | "finish";
}

interface createTrainingParams {
	name: string;
	days?: string[];
	duration: number;
	exercises?: string[];
	hours?: number;
	minutes?: number;
}

interface updateTrainingParams {
	id: string;
	name?: string;
	days?: string[];
	duration?: number;
	exercises?: string[];
}

interface Training {
	$id: string;
	user: string;
	name: string;
	days?: string[];
	duration: number;
}

interface Exercise {
	$id: string;
	name: string;
	type: any;
	difficulty: string;
	image?: string;
}

interface CalendarDay {
	dateString: string;
	day: number;
	month: number;
	year: number;
	timestamp: number;
}

interface PricingPlan {
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

interface PricingCardProps {
	plan: PricingPlan;
	currentPlan?: string;
	onSelect: (planId: string) => void;
	isLoading?: boolean;
	disabled?: boolean;
}
