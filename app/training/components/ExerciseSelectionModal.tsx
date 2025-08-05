import ExerciseItem from "@/app/exercise/components/ExerciseItem";
import { Exercise } from "@/type";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ExerciseSelectionModal = ({
	isVisible,
	onClose,
	onExerciseSelected,
}: {
	isVisible: boolean;
	onClose: () => void;
	onExerciseSelected?: (exercises: Exercise[]) => void;
}) => {
	const panY = useRef(new Animated.Value(0)).current;
	const screenHeight = Dimensions.get("screen").height;

	const resetPositionAnim = Animated.timing(panY, {
		toValue: 0,
		duration: 300,
		useNativeDriver: true,
	});

	const closeAnim = Animated.timing(panY, {
		toValue: screenHeight,
		duration: 300,
		useNativeDriver: true,
	});

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: (e, gestureState) => {
				if (gestureState.dy > 0) {
					panY.setValue(gestureState.dy);
				}
			},
			onPanResponderRelease: (e, gestureState) => {
				if (gestureState.dy > 200) {
					closeModal();
				} else {
					resetPositionAnim.start();
				}
			},
		})
	).current;

	useEffect(() => {
		if (isVisible) {
			panY.setValue(0);
			resetPositionAnim.start();
		}
	}, [isVisible]);

	const closeModal = () => {
		closeAnim.start(() => {
			onClose();
		});
	};

	// Ne pas rendre si pas visible
	if (!isVisible) return null;

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={isVisible}
			onRequestClose={closeModal}
		>
			<TouchableWithoutFeedback onPress={closeModal}>
				<View className='flex-1 bg-black/40 justify-end'>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<Animated.View
							style={{
								transform: [{ translateY: panY }],
								shadowColor: "#000",
								shadowOffset: { width: 0, height: -10 },
								shadowOpacity: 0.25,
								shadowRadius: 10,
								elevation: 10,
								borderTopLeftRadius: 20,
								borderTopRightRadius: 20,
							}}
							className='bg-background p-5 h-3/5 w-full'
						>
							<View
								{...panResponder.panHandlers}
								className='flex justify-center items-center mb-3 h-4 w-full'
							>
								<View className='h-1 w-16 bg-primary-100 rounded-full'></View>
							</View>

							<View>
								<Text className='text-center text-primary font-calsans text-lg'>
									Choisis tes exercices
								</Text>

								<Text className='text-center text-primary-100 italic text-sm mb-3'>
									(En cours de développement)
								</Text>

								<ExerciseItem
									name='Full planche'
									type='Push'
									difficulty='Avancée'
								/>
							</View>
						</Animated.View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default ExerciseSelectionModal;
