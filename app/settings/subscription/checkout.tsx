import { StripeProvider } from "@stripe/stripe-react-native";
import React from "react";
import { SafeAreaView, Text } from "react-native";

const Checkout = () => {
	const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY ?? "";

	if (!publishableKey) {
		return (
			<SafeAreaView className='flex-1 px-5 bg-background'>
				<Text>Stripe publishable key is missing.</Text>
			</SafeAreaView>
		);
	}

	return (
		<StripeProvider publishableKey={publishableKey}>
			<SafeAreaView className='flex-1 px-5 bg-background'></SafeAreaView>
		</StripeProvider>
	);
};

export default Checkout;
