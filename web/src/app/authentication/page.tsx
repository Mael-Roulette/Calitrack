"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login, register, getCurrentUser } from "@/lib/authentification";

interface User {
  $id: string;
  name: string;
  email: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [ loggedInUser, setLoggedInUser ] = useState<User | null>( null );
  const [ email, setEmail ] = useState<string>( "" );
  const [ password, setPassword ] = useState<string>( "" );
  const [ name, setName ] = useState<string>( "" );
  const [ isLoading, setIsLoading ] = useState<boolean>( false );
  const [ error, setError ] = useState<string>( "" );

  // Vérifier si l'utilisateur est déjà connecté
  useEffect( () => {
    checkUser();
  }, [] );

  // Rediriger vers le dashboard si connecté
  useEffect( () => {
    if ( loggedInUser ) {
      router.push( '/coach/dashboard' );
    }
  }, [ loggedInUser, router ] );

  const checkUser = async () => {
    const user = await getCurrentUser();
    setLoggedInUser( user );
  };

  const submitLogin = async ( e: React.FormEvent<HTMLButtonElement> ) => {
    e.preventDefault();
    setError( "" );
    setIsLoading( true );

    try {
      await login( email, password );
      const user = await getCurrentUser();
      setLoggedInUser( user );
      setEmail( "" );
      setPassword( "" );
    } catch ( err ) {
      setError( "Login failed. Please check your credentials." );
      console.error( err );
    } finally {
      setIsLoading( false );
    }
  };

  const submitRegister = async ( e: React.MouseEvent<HTMLButtonElement> ) => {
    e.preventDefault();
    setError( "" );
    setIsLoading( true );

    try {
      await register( email, password, name );
      const user = await getCurrentUser();
      setLoggedInUser( user );
      setEmail( "" );
      setPassword( "" );
      setName( "" );
    } catch ( err ) {
      setError( "Registration failed. Please try again." );
      console.error( err );
    } finally {
      setIsLoading( false );
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Authentication</h2>

        { error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            { error }
          </div>
        ) }

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={ email }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => setEmail( e.target.value ) }
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={ password }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => setPassword( e.target.value ) }
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Name (for registration)"
            value={ name }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => setName( e.target.value ) }
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              onClick={ submitLogin }
              disabled={ isLoading || !email || !password }
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              { isLoading ? "Loading..." : "Login" }
            </button>
            <button
              type="button"
              onClick={ submitRegister }
              disabled={ isLoading || !email || !password || !name }
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              { isLoading ? "Loading..." : "Register" }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;