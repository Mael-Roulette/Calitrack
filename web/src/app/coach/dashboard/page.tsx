"use client";
import { getCurrentUser, logout } from "@/lib/authentification";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  $id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const router = useRouter();
  const [ loggedInUser, setLoggedInUser ] = useState<User | null>( null );
  const [ isLoading, setIsLoading ] = useState<boolean>( true );
  const [ error, setError ] = useState<string>( "" );

  // Vérifier si l'utilisateur est connecté
  useEffect( () => {
    checkUser();
  }, [] );

  // Rediriger vers l'authentification si pas connecté
  useEffect( () => {
    if ( !isLoading && !loggedInUser ) {
      router.push( '/authentication' );
    }
  }, [ loggedInUser, isLoading, router ] );

  const checkUser = async () => {
    try {
      const user = await getCurrentUser();
      console.log( user );
      setLoggedInUser( user );
    } catch ( err ) {
      console.error( err );
    } finally {
      setIsLoading( false );
    }
  };

  const handleLogout = async () => {
    setIsLoading( true );
    try {
      await logout();
      setLoggedInUser( null );
      router.push( '/authentication' );
    } catch ( err ) {
      setError( "Logout failed. Please try again." );
      console.error( err );
      setIsLoading( false );
    }
  };

  // Afficher un loader pendant la vérification
  if ( isLoading ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  // Ne rien afficher si pas connecté , la redirection se fera
  if ( !loggedInUser ) {
    return null;
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
        <p className="text-gray-700 mb-4">
          Logged in as <span className="font-semibold">{ loggedInUser.name }</span>
        </p>

        { error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            { error }
          </div>
        ) }

        <button
          type="button"
          onClick={ handleLogout }
          disabled={ isLoading }
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          { isLoading ? "Logging out..." : "Logout" }
        </button>
      </div>
    </div>
  );
};

export default Dashboard;