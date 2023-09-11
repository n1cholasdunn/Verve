import React, {useEffect, useState, useContext} from 'react';
import app, {auth} from '../firebaseConfig';

interface UserInfo {
  email: string;
  UserUID: string;
}
export const AuthContext = React.createContext<UserInfo>({
  email: '',
  UserUID: '',
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState<UserInfo>();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser({
          email: user.email,
          UserUID: user.uid,
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}
