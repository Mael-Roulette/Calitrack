import { icons } from "@/constants/icons";
import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import { Redirect, Tabs } from "expo-router";
import { Image, StatusBar, TouchableOpacity } from "react-native";

const TabIcon = ({ icon }: TabBarIconProps) => (
	<Image source={icon} width={20} height={20} />
);

const TabsLayout = () => {
	const { isAuthenticated } = useAuthStore();

	if (!isAuthenticated) return <Redirect href={'/(auth)/sign-in'} />;
	return (
		<>
			<StatusBar barStyle='dark-content' />
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarLabelPosition: "beside-icon",
					tabBarButton: (props) => (
						<TouchableOpacity
							{...(props as any)}
							activeOpacity={1}
							style={[
								props.style,
								{
									flex: 1,
									borderRadius: 44,
									paddingHorizontal: 20,
								},
							]}
						/>
					),
					tabBarStyle: {
						backgroundColor: "#FFF9F7",
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						paddingHorizontal: 8,
						paddingTop: 8,
						paddingBottom: 20,
						height: 80,
					},
					tabBarActiveBackgroundColor: "#FC7942",
					tabBarActiveTintColor: "#FFF9F7",
					tabBarInactiveTintColor: "#132541",
				}}
			>
				<Tabs.Screen
					name='index'
					options={{
						title: "Accueil",
						tabBarIcon: ({ focused }) => (
							<TabIcon icon={focused ? icons.home_focus : icons.home} />
						),
					}}
				/>
				<Tabs.Screen
					name='goals'
					options={{
						title: "Objectifs",
						tabBarIcon: ({ focused }) => (
							<TabIcon icon={focused ? icons.goals_focus : icons.goals} />
						),
					}}
				/>
				<Tabs.Screen
					name='training'
					options={{
						title: "Entrainements",
						tabBarIcon: ({ focused }) => (
							<TabIcon icon={focused ? icons.training_focus : icons.training} />
						),
					}}
				/>
				<Tabs.Screen
					name='calendar'
					options={{
						title: "Calendrier",
						tabBarIcon: ({ focused }) => (
							<TabIcon icon={focused ? icons.calendar_focus : icons.calendar} />
						),
					}}
				/>
				<Tabs.Screen
					name='profile'
					options={{
						title: "Profil",
						tabBarIcon: ({ focused }) => (
							<TabIcon icon={focused ? icons.profile_focus : icons.profile} />
						),
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabsLayout;
