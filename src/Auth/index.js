import { createContext, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthContext = createContext();

export const AuthRoute = ({ children }) => {
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();

  useEffect( () => {
    if (user) {
        navigate("/selector", { replace: true });
    } else {
        navigate("/", { replace: true });
    }
  }, [user])

  const value = useMemo(
    () => ({
      user,
    }),
    [user]
  );

  if (!user) {
    return null
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthRoute