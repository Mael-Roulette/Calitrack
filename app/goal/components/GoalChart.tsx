import React from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const GoalChart = () => {
	const data = {
		labels: ["January", "February", "March", "April", "May", "June"],
		datasets: [
			{
				data: [20, 45, 28, 80, 99, 43],
				color: (opacity = 1) => `rgba(252, 121, 66, ${opacity})`,
			},
		],
	};

	const chartConfig = {
		backgroundColor: "#FFF9F7",
		backgroundGradientFrom: "#FFF9F7",
		backgroundGradientTo: "#FFF9F7",
		decimalPlaces: 0,
		color: (opacity = 1) => `rgba(252, 121, 66, ${opacity})`,
		labelColor: (opacity = 1) => `rgba(19, 37, 65, ${opacity})`,
		style: {
			borderRadius: 16,
		},
		propsForDots: {
			r: "6",
			strokeWidth: "2",
			stroke: "#FC7942",
		},
	};

	return (
		<View>
			<LineChart
				data={data}
				width={300}
				height={220}
				chartConfig={chartConfig}
				bezier
				style={{
					marginVertical: 8,
					borderRadius: 16,
					alignSelf: "center",
				}}
			/>
		</View>
	);
};

export default GoalChart;
