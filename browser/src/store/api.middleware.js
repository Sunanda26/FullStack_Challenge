import { START_LOADER, STOP_LOADER } from "./types";

const FETCH_FAILED = "Failed to fetch";

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const BASE_URL = "http://localhost:8000/api/v1/";

async function invokeAPI(endpoint, config, isForm) {
  const systemHeaders = { ...DEFAULT_HEADERS };

  const headers = systemHeaders;

  const updatedConfig = { ...config, headers };

  const response = await fetch(BASE_URL + endpoint, updatedConfig);

  const body = await response.json();
  if (response.status >= 500) {
    throw new Error("Something went wrong");
  }
  if (response.status >= 400) {
    const { __globals = [], code, ...errors } = body;
    //TODO: Fix this error so we can send errors from API directly.
    const [firstError] = [...Object.values(errors), ...__globals];
    throw new Error(firstError || "Something went wrong");
  }
  return body;
}

export const CALL_API = Symbol("Call API");

export default (store) => (next) => async (action) => {
  // So the middleware doesn't get applied to every single action
  if (typeof action[CALL_API] === "undefined") {
    return next(action);
  }

  let {
    url,
    method,
    types = [],
    showLoader = false,
    body = undefined,
    isForm = false,
    params,
  } = action[CALL_API];

  params = { ...params };
  const [requestType, successType] = types;

  requestType && next({ type: requestType });
  try {
    if (showLoader) {
      next({ type: START_LOADER });
      //TODO: Dispatch show modal loader now.
    }
    const queryParams = new URLSearchParams();
    for (let param in params) {
      if (params[param]) {
        queryParams.set(param, params[param]);
      }
    }

    const responseBody = await invokeAPI(
      url + "?" + queryParams.toString(),

      { method, body: !!isForm ? body : JSON.stringify(body) },
      isForm
    );

    successType &&
      next({
        body: responseBody,
        type: successType,
      });

    return responseBody;
  } catch (error) {
    if (error.message !== FETCH_FAILED) {
      throw error;
    }
    //     else if (error.message === FETCH_FAILED) {
    //       alert(
    //         `Something went wrong!!
    // please check your internet connectivity or try again later`
    //       );
    //     }
  } finally {
    if (showLoader) {
      next({ type: STOP_LOADER });
      //TODO: Dispatch hide modal loader now.
    }
  }
};
