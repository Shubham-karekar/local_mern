
import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../Reducer/productReducer";

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  singleProduct: [],
  filter: {
    text: "",
    category: "all",
    company: "all",
  },
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const { data } = await axios.get(API);
      dispatch({ type: "SET_API_DATA", payload: data });
    } catch (error) {
      console.error("Error fetching products:", error);
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>;
};

const useProductContext = () => useContext(AppContext);

export { AppProvider, useProductContext };
