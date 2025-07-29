import { Models } from "react-native-appwrite";

export interface User extends Models.Document {
	name: string;
	email: string;
	avatar: string;
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
	$id: string;
	title: string;
	type: "hold" | "reps";
	progress: number;
	total: number;
	state: "in-progress" | "finish";
}