import {
	CreateUserParams,
	SignInParams,
	User,
	Goal,
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

export const appwriteConfig = {
	endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
	projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
	platform: "com.calitrack.sportapp",
	databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
	userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
	goalCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GOAL_COLLECTION_ID!,
	trainingCollectionId: process.env.EXPO_PUBLIC_APPRWITE_TRAINING_COLLECTION_ID!,
};

export const client = new Client();

client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId)
	.setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

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

export const signIn = async ({ email, password }: SignInParams) => {
	try {
		await account.createEmailPasswordSession(email, password);
	} catch (e) {
		throw new Error(e as string);
	}
};

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

export const logout = async () => {
	try {
		const result = await account.deleteSession("current");
		return result;
	} catch (e) {
		console.log("Logout error:", e);
		throw new Error((e as string) || "Failed to logout");
	}
};

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

		if (progressGoals.length >= 4) {
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

export const updateGoal = async (
	id: string,
	{ progress, state, updateDate }: updatedGoalParams
) => {
	try {
		const currentGoal = await databases.getDocument(
			appwriteConfig.databaseId,
			appwriteConfig.goalCollectionId,
			id
		);

		const newState = progress >= currentGoal.total ? "finish" : "in-progress";

		await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.goalCollectionId,
			id,
			{
				progress,
				state: newState,
				updateAt: updateDate,
			}
		);
	} catch (e) {
		throw new Error(e as string);
	}
};

export const createTraining = async ({
	name,
	days,
	duration,
}: createTrainingParams) => {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) throw Error;

		const training = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.trainingCollectionId,
			ID.unique(),
			{
				user: currentUser.$id,
				name,
				days,
				duration,
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

export const updateTraining = async (
	id: string,
	{ name, days }: updateTrainingParams
) => {
	try {
		await databases.updateDocument(
			appwriteConfig.databaseId,
			appwriteConfig.trainingCollectionId,
			id,
			{
				name,
				days
			}
		);
	} catch (e) {
		throw new Error(e as string);
	}
};
