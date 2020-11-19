import {
  LIST_DATA_FAILED,
  LIST_DATA_SUCCESS,
  LIST_DATA,
} from "../types/dashboard";
import { CALL_API } from "../api.middleware";

export const getList = (params) => async (dispatch) => {
  try {
    return await dispatch({
      [CALL_API]: {
        url: "books",
        params,
        method: "GET",
        types: [LIST_DATA_FAILED, LIST_DATA_SUCCESS, LIST_DATA],
      },
    });
  } catch (error) {
    alert(`${error}`);
  }
};
