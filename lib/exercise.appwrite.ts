import { appwriteConfig, databases } from "./appwrite";

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
