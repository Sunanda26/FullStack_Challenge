import { LIST_DATA_SUCCESS } from "../types/dashboard";

const initialState = {
  totalList: [],
};

export function DashboardReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_DATA_SUCCESS: {
      const { data } = action.body;
      return {
        ...state,
        totalList: data,
      };
    }

    default:
      return state;
  }
  return state;
}
