import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

const CustomHeader = ({
	title,
	link,
	icon,
}: {
	title: string;
	link?: any;
	icon?: any;
}) => {
	return (
		<View className='flex-row items-center justify-between flex-1 w-full'>
			<Text className='title'>{title}</Text>

			{link && (
				<Link href={link}>
					{icon}
				</Link>
			)}
		</View>
	);
};

export default CustomHeader;
