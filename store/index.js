import { createStore, applyMiddleware } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {
  isAuthenticated: false,
  userData: {},
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case "LOGIN_USER":
      return {
        ...state,
        isAuthenticated: true,
        userData: { ...action.payload },
        cart: action.payload.cart.items,
      };
    case "LOGOUT_USER":
      return { initialState };
    case "UPDATE_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

const makeStore = (context) =>
  createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export const wrapper = createWrapper(makeStore, { debug: false });
