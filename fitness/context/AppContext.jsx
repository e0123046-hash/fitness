import { createContext, useContext, useReducer, useEffect } from "react";
import AppReducer from "../reducer/AppReducer";
import { getToken, getDataset } from "../services/api";

const initialState = {
  activities: [],
  loading: true,
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenRes = await getToken();
        const activities = await getDataset(
          tokenRes.token,
          tokenRes.dataUrl
        );
        dispatch({ type: "SET_ACTIVITIES", payload: activities });
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    };
    fetchData();
  }, []);

  const toggleGoal = (id) =>
    dispatch({ type: "TOGGLE_GOAL", payload: id });

  return (
    <AppContext.Provider
      value={{
        activities: state.activities,
        loading: state.loading,
        toggleGoal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);