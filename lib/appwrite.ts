import {
	CreateUserParams,
	SignInParams,
	User,
	updatedGoalParams,
	createGoalParams,
	createTrainingParams,
	updateTrainingParams,
} from "@/type";
import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from "react-native-appwrite";
import { MAX_TRAININGS, MAX_GOALS } from "@/constants/value";

export const appwriteConfig = {
	endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
	projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
	platform: "com.calitrack.sportapp",
	databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
	userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
	goalCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GOAL_COLLECTION_ID!,
	trainingCollectionId:
		process.env.EXPO_PUBLIC_APPRWITE_TRAINING_COLLECTION_ID!,
	exerciseCollectionId:
		process.env.EXPO_PUBLIC_APPWRITE_EXERCISE_COLLECTION_ID!,
};

export const client = new Client();

client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId)
	.setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

/**
 * Permet de créer un nouvel utilisateur
 * @param param0 - email, password, name
 * @returns {Promise<Document>} - Document de l'utilisateur créé
 * @throws {Error} - Si l'utilisateur n'a pas pu être créé
 */
export const createUser = async ({
	email,
	password,
	name,
}: CreateUserParams) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, name);
		if (!newAccount) throw Error;

		await signIn({ email, password });

		const avatarUrl = avatars.getInitialsURL(name);

		return await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			{ email, name, accountId: newAccount.$id, avatar: avatarUrl }
		);
	} catch (e) {
		throw new Error(e as string);
	}
};

/**
 * Permet de se connecter avec un email et un mot de passe
 * @param param0 - email, password
 * @returns {Promise<void>} - Si la connexion a réussi
 * @throws {Error} - Si la connexion a échoué
 */
export const signIn = async ({ email, password }: SignInParams) => {
	try {
		await account.createEmailPasswordSession(email, password);
	} catch (e) {
		throw new Error(e as string);
	}
};

/**
 * Permet de récupérer l'utilisateur actuellement connecté
 * @returns {Promise<User>} - L'utilisateur actuellement connecté
 * @throws {Error} - Si l'utilisateur n'a pas pu être récupéré
 */
export const getCurrentUser = async (): Promise<User> => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		return currentUser.documents[0] as any;
	} catch (e) {
		throw new Error(e as string);
	}
};

/**
 * Permet de se déconnecter de la session actuelle
 * @returns {Promise<void>} - Si la déconnexion a réussi
 * @throws {Error} - Si la déconnexion a échoué
 */
export const logout = async () => {
	try {
		const result = await account.deleteSession("current");
		return result;
	} catch (e) {
		throw new Error((e as string) || "Failed to logout");
	}
};

/**
 * Permet de créer un nouvel objectif
 * @param param0 - title, type, progress, total
 * @returns {Promise<{goal: Document, message: {title: string, body: string}}>} - L'objectif créé et un message de succès
 * @throws {Error} - Si l'objectif n'a pas pu être créé
 */
export const createGoal = async ({
	title,
	type,
	progress,
	total,
}: createGoalParams) => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) throw Error;

		const existingGoals = await getGoalsFromUser();
		const progressGoals = existingGoals.filter(
			(goal) => goal.state === "in-progress"
		);

		if (progressGoals.length >= MAX_GOALS) {
			const message = {
				title: "Nombre maximum d'objectifs atteint",
				body: "Vous ne pouvez pas avoir plus de 4 objectifs en cours.",
			};

			return message;
		}

		const goal = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.goalCollectionId,
			ID.unique(),
			{
				createdAt: new Date().toISOString(),
				user: currentUser.$id,
				title,
				type,
				progress: progress || 0,
				total,
				state: "in-progress",
				progressHistory: JSON.stringify([progress || 0]),
			}
		);

		const message = {
			title: "Nouvel objectif créé",
			body: `Votre objectif "${title}" a été créé avec succès.`,
		};

		return { goal, message };
	} catch (e) {
		throw new Error(e as string);
	}
};

/**
 * Permet de récupérer les objectifs de l'utilisateur actuellement connecté
 * @returns {Promise<Document[]>} - Liste des objectifs de l'utilisateur
 * @throws {Error} - Si les objectifs n'ont pas pu être récupérés
 */
export const getGoalsFromUser = async () => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) throw Error;

		const goals = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.goalCollectionId,
			[Query.equal("user", currentUser.$id)]
		);

		return goals.documents;
	} catch (e) {
		throw new Error(e as string);
	}
};

/**
 * Permet de modifier un objectif existant
 * @param id - ID de l'objectif à modifier
 * @param param1 - progress, updateDate
 * @returns {Promise<void>} - Si la mise à jour a réussi
 * @throws {Error} - Si la mise à jour a échoué
 */
export const updateGoal = async (
	id: string,
	{ progress, updateDate }: updatedGoalParams
) => {
	try {
		const currentGoal = await databases.getDocument(
			appwriteConfig.databaseId,
			appwriteConfig.goalCollectionId,
			id
		);

		const newState = progress >= currentGoal.total ? "finish" : "in-progress";

		const progressHistoryArray = JSON.parse(currentGoal.progressHistory);
		progressHistoryArray.push(progress);

		await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.goalCollectionId,
			id,
			{
				progress,
				progressHistory: JSON.stringify(progressHistoryArray),
				state: newState,
				updateAt: updateDate,
			}
		);
	} catch (e) {
		throw new Error(e as string);
	}
};

/**
 * Permet de créer un nouvel entrainement
 * @param param0 - name, days, duration
 * @returns {Promise<{training: Document, message: {title: string, body: string}}>} - L'entrainement créé et un message de succès
 * @throws {Error} - Si l'entrainement n'a pas pu être créé
 */
export const createTraining = async ({
	name,
	days,
	duration,
	exercises,
}: createTrainingParams) => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) throw Error;

		const existingTrainings = await getTrainingsFromUser();

		if (existingTrainings.length >= MAX_TRAININGS) {
			const message = {
				title: "Nombre maximum d'entrainements atteint",
				body: "Vous ne pouvez pas ajouter plus de 10 entrainements.",
			};
			return message;
		}

		let exercisesTab: any = [];
		if (exercises && exercises.length !== 0) {
			exercisesTab = exercises;
		}

		const training = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.trainingCollectionId,
			ID.unique(),
			{
				user: currentUser.$id,
				Name: name,
				Days: days,
				Duration: duration,
				exercise: exercisesTab,
			}
		);

		const message = {
			title: "Nouveau training créé",
			body: `Votre entrainement "${name}" a été créé avec succès.`,
		};

		return { training, message };
	} catch (e) {
		throw new Error(e as string);
	}
};

/**
 * Permet de récupérer les entrainements de l'utilisateur actuellement connecté
 * @returns {Promise<Document[]>} - Liste des entrainements de l'utilisateur
 * @throws {Error} - Si les entrainements n'ont pas pu être récupérés
 */
export const getTrainingsFromUser = async () => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) throw Error;

		const trainings = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.trainingCollectionId,
			[Query.equal("user", currentUser.$id)]
		);

		return trainings.documents;
	} catch (e) {
		throw new Error(e as string);
	}
};

/**
 * Permet de récupérer les entrainements de l'utilisateur avec un jour spécifique
 * @param day - Le jour pour lequel récupérer les entrainements
 * @returns {Promise<Document[]>} - Liste des entrainements de l'utilisateur pour le jour spécifié
 * @throws {Error} - Si les entrainements n'ont pas pu être récupérés
 */
export const getTrainingFromUserByDay = async (day: string) => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) throw Error;

		const trainings = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.trainingCollectionId,
			[Query.equal("user", currentUser.$id), Query.equal("Days", day)]
		);

		return trainings.documents;
	} catch (e) {
		throw new Error(e as string);
	}
};

/**
 * Permet de récupérer un entrainement par son ID
 * @param id - ID de l'entrainement à récupérer
 * @returns {Promise<Document>} - L'entrainement récupéré
 * @throws {Error} - Si l'entrainement n'a pas pu être récupéré
 */
export const getTrainingById = async (id: string) => {
	try {
		const training = await databases.getDocument(
			appwriteConfig.databaseId,
			appwriteConfig.trainingCollectionId,
			id
		);

		return training;
	} catch (e) {
		throw new Error(e as string);
	}
};

/**
 * Permet de mettre à jour un entrainement existant
 * @param id - ID de l'entrainement à modifier
 * @param param1 - name, days, duration
 * @returns {Promise<void>} - Si la mise à jour a réussi
 * @throws {Error} - Si la mise à jour a échoué
 */
export const updateTraining = async ({
	id,
	name,
	days,
	duration,
	exercises
}: updateTrainingParams) => {
	try {
		await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.trainingCollectionId,
			id,
			{
				Name: name,
				Days: days,
				Duration: duration,
				exercise: exercises,
			}
		);
	} catch (e) {
		throw new Error(e as string);
	}
};

/**
 * Permet de supprimer un entrainement en fonction de son id
 * @param id - id de l'entrainement
 */
export const deleteTraining = async (id: string) => {
	try {
		await databases.deleteDocument(
			appwriteConfig.databaseId,
			appwriteConfig.trainingCollectionId,
			id
		);
	} catch (e) {
		throw new Error(e as string);
	}
};

/**
 * Permet de récupérer tous les exercices disponibles
 * @returns {Promise<Document[]>} - Liste des exercices disponibles
 * @throws {Error} - Si les exercices n'ont pas pu être récupérés
 */
export const getAllExercises = async () => {
	try {
		const exercises = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.exerciseCollectionId
		);

		return exercises.documents;
	} catch (e) {
		throw new Error(e as string);
	}
};
