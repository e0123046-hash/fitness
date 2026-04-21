const AppReducer = (state, action) => {
  switch (action.type) {

    case "SET_ACTIVITIES":
      return {
        ...state,
        activities: Array.isArray(action.payload)
          ? action.payload
          : [],
        loading: false,
      };

    case "TOGGLE_GOAL":
      return {
        ...state,
        activities: state.activities.map((a) =>
          a.id === action.payload &&
          typeof a.goalAchieved === "boolean"
            ? { ...a, goalAchieved: !a.goalAchieved }
            : a
        ),
      };

    default:
      return state;
  }
};

export default AppReducer;