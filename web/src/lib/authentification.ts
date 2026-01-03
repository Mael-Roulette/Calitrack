import { ID, account } from "@/lib/appwrite";

export const login = async ( email: string, password: string ) => {
  const session = await account.createEmailPasswordSession( {
    email,
    password
  } );
  return session;
};

export const register = async ( email: string, password: string, name: string ) => {
  await account.create( {
    userId: ID.unique(),
    email,
    password,
    name
  } );

  return await login( email, password );
};

export const logout = async () => {
  await account.deleteSession( { sessionId: "current" } );
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch ( error ) {
    return null;
  }
};