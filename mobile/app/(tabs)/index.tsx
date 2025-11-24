import CustomButton from "@/components/CustomButton";
import { DAYS_EN, DAYS_FR } from "@/constants/value";
import { useAuthStore, useGoalsStore, useTrainingsStore } from "@/store";
import useExercicesStore from "@/store/exercises.stores";
import { Goal, Training } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from '@react-native-async-storage/async-storage';
import cn from 'clsx';
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import CustomCalendar from "../calendar/components/CustomCalendar";
import GoalItem from "../goal/components/GoalItem";
import TrainingItem from "../training/components/TrainingItem";

const FIRST_LAUNCH_KEY = '@first_launch_done';
const getDayInEnglish = ( date: Date ) => DAYS_EN[ date.getDay() ];
const formatDate = ( date: Date ) => DAYS_FR[ date.getDay() ];

export default function Index () {
	const [ showWelcomeModal, setShowWelcomeModal ] = useState( false );
	const { user, isLoading } = useAuthStore();
	const { goals, isLoadingGoals, fetchUserGoals } = useGoalsStore();
	const { fetchUserTrainings, trainings, isLoadingTrainings } = useTrainingsStore();
	const { fetchExercises } = useExercicesStore();

	useEffect( () => {
		if ( !isLoading && !user ) {
			router.replace( "/(auth)" );
		}
	}, [ user, isLoading ] );

	// Lancement de la vérification de first launch
	useEffect( () => {
		checkFirstLaunch();
	}, [] );

	const checkFirstLaunch = async () => {
		try {
			// Récupère la clé du local storage
			const hasLaunched = await AsyncStorage.getItem( FIRST_LAUNCH_KEY );

			if ( hasLaunched === null || hasLaunched === 'false' ) {
				// Premier lancement
				setShowWelcomeModal( true );
				await AsyncStorage.setItem( FIRST_LAUNCH_KEY, 'true' );
			}
		} catch ( error ) {
			console.error( 'Erreur lors de la vérification du premier lancement:', error );
		}
	};

	// Fermeture de la modal de bienvenue
	const handleCloseModal = () => {
		setShowWelcomeModal( false );
	};

	// Navigation vers la page des objectifs
	const handleGoalNav = () => {
		router.push( '/(tabs)/goals' )
	}

	const upcomingTrainings = useMemo( () => {
		const result = [];
		const currentDate = new Date();

		for ( let i = 0; i <= 2; i++ ) {
			const nextDate = new Date();
			nextDate.setDate( currentDate.getDate() + i );

			const dayName = getDayInEnglish( nextDate );

			// Filtrer les trainings pour ce jour
			const dayTrainings = trainings.filter( ( training: Training ) =>
				training.days?.includes( dayName )
			);

			result.push( {
				date: nextDate,
				trainings: dayTrainings,
			} );
		}

		return result;
	}, [ trainings ] );

	useEffect( () => {
		fetchUserGoals();
		fetchUserTrainings();
		fetchExercises();
	}, [ fetchUserGoals, fetchUserTrainings, fetchExercises, user ] );

	const { progressGoals } = useMemo(
		() => ( {
			progressGoals: goals.filter( ( goal: Goal ) => goal.state === "in-progress" ),
		} ),
		[ goals ]
	);

	return (
		<View className='bg-background flex-1 '>
			{ isLoading ? (
				<View>
					<Text className='title'>Chargement...</Text>
				</View>
			) : (
				<ScrollView showsVerticalScrollIndicator={ true } className='px-5'>
					<Modal
						animationType="fade"
						transparent={ true }
						visible={ showWelcomeModal }
						onRequestClose={ handleCloseModal }
					>
						<View className='flex-1 justify-center items-center bg-black/50'>
							<View className="rounded-xl shadow bg-background w-[90%] p-5">
								<Text className="title-2 mb-3">Bienvenue !</Text>
								<Text className="text mb-4">Merci d&apos;avoir rejoint la version bêta de l&apos;application !</Text>
								<Text className="text mb-2">Avant de commencer, voici quelques points importants :</Text>
								<Text className="text mb-2">• Les fonctionnalités actuelles sont les bases de l&apos;application, ton avis est précieux pour les améliorer et en ajouter de nouvelles !</Text>
								<Text className="text mb-4">• Garde à l&apos;esprit que toutes les données que tu saisis pendant la bêta pourraient être supprimées à la fin de cette phase.</Text>
								<Text className="text mb-8">Merci encore pour ta participation et ton aide !</Text>
								<CustomButton
									title="Commencer"
									onPress={ handleCloseModal }
								/>
							</View>
						</View>
					</Modal>

					<View>
						<View className='flex-row gap-2 items-center mb-4'>
							<Feather name='target' size={ 24 } color='#FC7942' />
							<Text className='text-2xl font-calsans text-primary'>
								Mes objectifs en cours
							</Text>
						</View>

						{ isLoadingGoals ? (
							<View>
								<Text className='indicator-text'>
									Chargement...
								</Text>
							</View>
						) : (
							<View>
								{ progressGoals.map( ( item: Goal ) => (
									<GoalItem
										key={ item.$id }
										$id={ item.$id }
										exercise={ item.exercise }
										progress={ item.progress }
										total={ item.total }
										state={ item.state }
									/>
								) ) }
								{ progressGoals.length === 0 && (
									<>
										<Text className='indicator-text mb-4'>
											Aucun objectif en cours.
										</Text>
										<CustomButton
											title="Ajouter un objectif"
											onPress={ handleGoalNav }
										/>
									</>
								) }
							</View>
						) }
					</View>

					<View className="mt-8">
						{ isLoadingTrainings ? (
							<Text className='indicator-text'>Chargement des entraînements...</Text>
						) : (
							upcomingTrainings.map( ( item: any, index: number ) => {
								const isFirstDay = index === 0;
								const formattedDate = isFirstDay ? "Entraînement du jour" : formatDate( item.date );

								return (
									<View
										key={ `${item.date.getTime()}-${index}` }
										className={ index > 0 ? "mt-5" : "" }
									>
										<View className="flex-row items-center gap-4 mb-3">
											{ isFirstDay &&
												<MaterialCommunityIcons name="calendar-badge" size={ 24 } color="#FC7942" />
											}
											<Text className={ cn( 'text-primary font-calsans', isFirstDay ? 'text-2xl' : 'text-xl' ) }>

												{ formattedDate }
											</Text>
										</View>

										{ item.trainings.length > 0 ? (
											<>
												{ item.trainings.map(
													( training: Training, trainingIndex: number ) => (
														<View
															key={ `${item.date.getTime()}-${training.$id}-${trainingIndex}` }
															className={ trainingIndex > 0 ? "mt-3" : "" }
														>
															<TrainingItem
																id={ training.$id }
																title={ training.name }
																duration={ training.duration }
																isTrainingDay={ isFirstDay }
															/>
														</View>
													)
												) }
											</>
										) : (
											<View>
												<Text className='indicator-text mb-3'>
													Aucun entraînement prévu.
												</Text>

												{ isFirstDay &&
													<CustomButton
														title="Ajouter un entraînement"
														onPress={ handleGoalNav }
														variant="secondary"
													/>
												}
											</View>
										) }
									</View>
								);
							} )
						) }
					</View>

					<View className="mb-5">
						<View className='flex-row gap-2 items-center mt-8'>
							<MaterialCommunityIcons name="calendar-multiselect-outline" size={ 24 } color="#FC7942" />
							<Text className='text-2xl font-calsans text-primary'>Mon calendrier</Text>
						</View>
						<CustomCalendar />
					</View>
				</ScrollView>
			) }
		</View>
	);
}
