import { getCombosFromUser } from "@/lib/combo.appwrite";
import { Combo } from "@/types";
import { create } from "zustand";
import useAuthStore from "./auth.store";

type ComboState = {
  combos: Combo[];
  isLoadingCombos: boolean;
  setCombos: ( combos: Combo[] ) => void;
  setIsLoadingCombos: ( value: boolean ) => void;
  fetchUserCombos: () => Promise<void>;
  addCombo: ( combo: Combo ) => void;
  updateCombo: ( comboId: string, updatedCombo: Partial<Combo> ) => void;
  deleteCombo: ( comboId: string ) => void;
};

const useCombosStore = create<ComboState>( ( set, get ) => ( {
  combos: [],
  isLoadingCombos: false,

  setCombos: ( combos: Combo[] ) => set( { combos } ),

  setIsLoadingCombos: ( value: boolean ) => set( { isLoadingCombos: value } ),

  fetchUserCombos: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if ( !isAuthenticated ) return;

    set( { isLoadingCombos: true } );
    try {
      const documents = await getCombosFromUser();
      const combos = documents.map(
        ( doc ) =>
          ( {
            $id: doc.$id,
            user: doc.user,
            name: doc.name,
            exercises: doc.exercises,
            difficulty: doc.difficulty,
            tags: doc.tags,
          } ) as Combo
      );
      set( { combos } );
    } catch ( error ) {
      console.error( "Erreur lors de la récupération des combos:", error );
      set( { combos: [] } );
    } finally {
      set( { isLoadingCombos: false } );
    }
  },

  addCombo: ( combo: Combo ) => {
    set( ( state ) => ( { combos: [ ...state.combos, combo ] } ) );
  },

  updateCombo: ( comboId: string, updatedCombo: Partial<Combo> ) => {
    set( ( state ) => ( {
      combos: state.combos.map( ( combo ) =>
        combo.$id === comboId ? { ...combo, ...updatedCombo } : combo
      ),
    } ) );
  },

  deleteCombo: ( comboId: string ) => {
    set( ( state ) => ( {
      combos: state.combos.filter( ( combo ) => combo.$id !== comboId ),
    } ) );
  },
} ) );

export default useCombosStore;