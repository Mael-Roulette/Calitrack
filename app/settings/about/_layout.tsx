import { Stack } from "expo-router";
import React from "react";

const AboutLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: {
					backgroundColor: "#FFF9F7",
				},
				headerTintColor: "#132541",
				headerTitleStyle: {
					fontFamily: "CalSans-Regular",
				},
				headerShadowVisible: false,
			}}
		>
			<Stack.Screen
				name='index'
				options={{
					title: "À propos",
				}}
			/>
		</Stack>
	);
};

export default AboutLayout;
