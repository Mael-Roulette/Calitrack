import { MAX_COMBOS } from "@/constants/value";
import { createComboParams, updateComboParams } from "@/types";
import {
  ID,
  Query
} from "react-native-appwrite";
import { appwriteConfig, databases } from "./appwrite";
import { getCurrentUser } from "./user.appwrite";

/**
 * Permet de créer un nouveau combo
 * @param param0 - name, exercises, difficulty, tags
 * @returns {Promise<{training: Document, message: {title: string, body: string}}>} - Le combo créé et un message de succès
 * @throws {Error} - Si le combo n'a pas pu être créé
 */
export const createCombo = async ( {
  name,
  exercises,
  difficulty,
  tags
}: createComboParams ) => {
  try {
    const currentUser = await getCurrentUser();
    if ( !currentUser ) throw Error;

    const existingCombos = await getCombosFromUser();

    if ( existingCombos.length >= MAX_COMBOS ) {
      const message = {
        title: "Nombre maximum d'entraînements atteint",
        body: "Vous ne pouvez pas ajouter plus de 10 entraînements.",
      };
      return message;
    }

    let exercisesTab: any = [];
    if ( exercises && exercises.length !== 0 ) {
      exercisesTab = exercises;
    }

    const combo = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.comboCollectionId,
      ID.unique(),
      {
        user: currentUser.$id,
        name: name,
        exercises: exercisesTab,
        difficulty: difficulty,
        tags: tags,
      }
    );

    const message = {
      title: "Nouveau training créé",
      body: `Votre entraînement "${name}" a été créé avec succès.`,
    };

    return { combo, message };
  } catch ( e ) {
    throw new Error( e as string );
  }
};

/**
 * Permet de récupérer les combos de l'utilisateur actuellement connecté
 * @returns {Promise<Document[]>} - Liste des combos de l'utilisateur
 * @throws {Error} - Si les combos n'ont pas pu être récupérés
 */
export const getCombosFromUser = async () => {
  try {
    const currentUser = await getCurrentUser();
    if ( !currentUser ) throw Error;

    const combos = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.comboCollectionId,
      [ Query.equal( "user", currentUser.$id ) ]
    );

    return combos.documents;
  } catch ( e ) {
    throw new Error( e as string );
  }
};

/**
 * Permet de récupérer un combo par son ID
 * @param id - ID du combo à récupérer
 * @returns {Promise<Document>} - Le combo récupéré
 * @throws {Error} - Si le combo n'a pas pu être récupéré
 */
export const getComboById = async ( id: string ) => {
  try {
    const combo = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.comboCollectionId,
      id
    );

    return combo;
  } catch ( e ) {
    throw new Error( e as string );
  }
};

/**
 * Permet de mettre à jour un combo existant
 * @param id - ID du combo à modifier
 * @param param1 - name, exercises, difficulty, tags
 * @returns {Promise<void>} - Si la mise à jour a réussi
 * @throws {Error} - Si la mise à jour a échoué
 */
export const updateCombo = async ( {
  id,
  name,
  exercises,
  difficulty,
  tags
}: updateComboParams ) => {
  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.comboCollectionId,
      id,
      {
        name: name,
        exercise: exercises,
        difficulty: difficulty,
        tags: tags
      }
    );
  } catch ( e ) {
    throw new Error( e as string );
  }
};

/**
 * Permet de supprimer un combo en fonction de son id
 * @param id - id du combo
 */
export const deleteCombo = async ( id: string ) => {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.comboCollectionId,
      id
    );
  } catch ( e ) {
    throw new Error( e as string );
  }
};
