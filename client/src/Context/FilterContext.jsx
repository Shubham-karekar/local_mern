import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "../Context/ProductContex";
import filterReducer from "../Reducer/FilterReducer";
// require('dotenv').config();

const FilterContext = createContext();


const initialState = {
  filter_products: [],
  all_products: [],
  list_view: false,
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
  },
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const setGridView = () => dispatch({ type: "SET_GRID_VIEW" });
  const setListView = () => dispatch({ type: "SET_LIST_VIEW" });

  const sorting = (event) =>
    dispatch({ type: "SET_SORT", payload: event.target.value });

  const updateFilterValue = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "UPDATE_FILTERS", payload: { name, value } });
  };

  const clearFilters = () => dispatch({ type: "CLEAR_FILTERS" });

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORT_PRODUCTS" });
  }, [state.filters, state.sorting_value]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sorting,
        updateFilterValue,
        clearFilters,
       
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
