import { useAuthStore } from "@/store";
import * as Sentry from "@sentry/react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import "./globals.css";

Sentry.init({
	dsn: "https://659bf5ca13cce02d2e0a6e42d57d1f9d@o4509674390683648.ingest.de.sentry.io/4509750754934864",

	// Adds more context data to events (IP address, cookies, user, etc.)
	// For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
	sendDefaultPii: true,

	// Configure Session Replay
	replaysSessionSampleRate: 1,
	replaysOnErrorSampleRate: 1,
	integrations: [
		Sentry.mobileReplayIntegration(),
		Sentry.feedbackIntegration(),
	],

	// uncomment the line below to enable Spotlight (https://spotlightjs.com)
	// spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
	const { fetchAuthenticatedUser, isLoading } = useAuthStore();

	const [fontsLoaded, error] = useFonts({
		"CalSans-Regular": require("../assets/fonts/CalSans-Regular.ttf"),
		"Sora-Regular": require("../assets/fonts/Sora-Regular.ttf"),
	});

	useEffect(() => {
		if (error) throw error;
		if (fontsLoaded) SplashScreen.hideAsync();
	}, [fontsLoaded, error]);

	useEffect(() => {
		fetchAuthenticatedUser();
	}, []);

	if (!fontsLoaded || isLoading) {
		return null;
	}

	return (
		<View className='bg-background flex-1'>
			<Stack screenOptions={{ headerShown: false }} />
		</View>
	);
});
