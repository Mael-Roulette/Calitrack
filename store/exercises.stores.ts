import { getAllExercises } from "@/lib/appwrite";
import { Exercise } from "@/type";
import { create } from "zustand";
import useAuthStore from "./auth.store";

type ExerciseState = {
	exercices: Exercise[];
	isLoadingExercices: boolean;

	setExercices: (exercices: Exercise[]) => void;
	setIsLoadingExercices: (value: boolean) => void;
	fetchExercises: () => Promise<void>;
};

const useExercicesStore = create<ExerciseState>((set, get) => ({
	exercices: [],
	isLoadingExercices: false,

	setExercices: (exercices: Exercise[]) => set({ exercices }),
	setIsLoadingExercices: (value: boolean) => set({ isLoadingExercices: value }),

	fetchExercises: async () => {
		const { isAuthenticated } = useAuthStore.getState();
		if (!isAuthenticated) return;

		set({ isLoadingExercices: true });

		try {
			const documents = await getAllExercises();
			const exercices = documents.map(
				(doc) =>
					({
						$id: doc.$id,
						name: doc.Name,
						description: doc.Description,
						type: doc.Type,
						difficulty: doc.Difficulty,
					}) as Exercise
			);
			set({ exercices });
		} catch (error) {
			console.error("Erreur lors de la récupération des exercices:", error);
			set({ exercices: [] });
		} finally {
			set({ isLoadingExercices: false });
		}
	},
}));

export default useExercicesStore;
