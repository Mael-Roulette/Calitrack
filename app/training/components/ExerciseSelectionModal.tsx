import ExerciseItem from "@/app/exercise/components/ExerciseItem";
import CustomButton from "@/components/CustomButton";
import useExercicesStore from "@/store/exercises.stores";
import { Exercise } from "@/type";
import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	Modal,
	PanResponder,
	ScrollView,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";

const ExerciseSelectionModal = ({
	isVisible,
	onClose,
	onExerciseSelected,
	initialSelectedExercises = [],
}: {
	isVisible: boolean;
	onClose: () => void;
	onExerciseSelected?: (exercises: Exercise[]) => void;
	initialSelectedExercises?: Exercise[];
}) => {
	const { exercices } = useExercicesStore();
	const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(
		initialSelectedExercises
	);
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
			setSelectedExercises(initialSelectedExercises);
		}
	}, [isVisible, initialSelectedExercises]);

	const closeModal = () => {
		closeAnim.start(() => {
			onClose();
		});
	};

	const handleExerciseToggle = (exercise: Exercise) => {
		setSelectedExercises((prev) => {
			const isAlreadySelected = prev.some((ex) => ex.$id === exercise.$id);

			if (isAlreadySelected) {
				// Désélectionner l'exercice
				return prev.filter((ex) => ex.$id !== exercise.$id);
			} else {
				// Sélectionner l'exercice
				return [...prev, exercise];
			}
		});
	};

	const isExerciseSelected = (exerciseId: string) => {
		return selectedExercises.some((ex) => ex.$id === exerciseId);
	};

	const handleConfirmSelection = () => {
		if (onExerciseSelected) {
			onExerciseSelected(selectedExercises);
		}
		closeModal();
	};
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
							className='bg-background p-5 h-4/5 w-full'
						>
							<View
								{...panResponder.panHandlers}
								className='flex justify-center items-center mb-3 h-4 w-full'
							>
								<View className='h-1 w-16 bg-primary-100 rounded-full'></View>
							</View>

							<View className='flex-1'>
								<Text className='text-center text-primary font-calsans text-lg mb-2'>
									Choisis tes exercices
								</Text>

								<Text className='text-center text-primary-100 text-sm mb-4'>
									{selectedExercises.length} exercice
									{selectedExercises.length > 1 ? "s" : ""} sélectionné
									{selectedExercises.length > 1 ? "s" : ""}
								</Text>

								<ScrollView
									className='flex-1 mb-4'
									showsVerticalScrollIndicator={false}
								>
									{exercices.map((exercise) => (
										<ExerciseItem
											key={exercise.$id}
											name={exercise.name}
											type={exercise.type}
											difficulty={exercise.difficulty}
											isSelected={isExerciseSelected(exercise.$id)}
											onPress={() => handleExerciseToggle(exercise)}
										/>
									))}
								</ScrollView>

								<View className='flex-row gap-3'>
									<CustomButton
										title='Annuler'
										variant='secondary'
										onPress={closeModal}
									/>
									<CustomButton
										title={`Confirmer (${selectedExercises.length})`}
										onPress={handleConfirmSelection}
									/>
								</View>
							</View>
						</Animated.View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default ExerciseSelectionModal;
