import { Exercise } from "./training";

export interface createComboParams {
	name: string;
	exercises: Exercise[];
  difficulty?: "easy" | "medium" | "hard";
  tags: "strength" | "endurance" | "control" | "balance";
}

export interface updateComboParams {
  id: string;
	name?: string;
	exercises?: Exercise[];
  difficulty?: "easy" | "medium" | "hard";
  tags?: "strength" | "endurance" | "control" | "balance";
}

export interface Combo {
  $id: string;
	name: string;
	exercises: Exercise[];
  difficulty: "easy" | "medium" | "hard";
  tags: "strength" | "endurance" | "control" | "balance";
}
