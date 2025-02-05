// import { createContext, useContext, useReducer, useEffect } from "react";
// import { useProductContext } from "./ProductContex";
// import reducer from "../Reducer/FilterReducer";

// const FilterContext = createContext();

// const initialState = {
//   filter_products: [],
//   all_products: [],
//   list_view: false,
//   grid_view: true,
//   sorting_value: "lowest",
//   filters: {
//     text: "",
//     category: "all",
//     color: "all",
//     maxPrice: 0,
//     price: 0,
//     minPrice: 0,
//     // Add other filters if needed
//   },
// };

// export const FilterContextProvider = ({ children }) => {
//   const { products } = useProductContext();

//   const [state, dispatch] = useReducer(reducer, initialState);

//   const setGridView = () => {
//     return dispatch({ type: "SET_GRID_VIEW" });
//   };

//   const setListView = () => {
//     return dispatch({ type: "SET_LIST_VIEW" });
//   };

//   const sorting = (event) => {
//     let userValue = event.target.value;
//     dispatch({ type: "GET_SORT_VALUE", payload: userValue });
//   };
//   const updateFilterValue = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     dispatch({ type: "UPDATE_FILTERS", payload: { name, value } });
//   };

//   // to clear the filter
//   const clearFilters = () => {
//     dispatch({ type: "CLEAR_FILTERS" });
//   };

//   useEffect(() => {
//     dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
//   }, [products]);

//   useEffect(() => {
//     dispatch({ type: "FILTER_PRODUCTS" });
//     dispatch({ type: "SORT_PRODUCTS" });
//   }, [state.filters, state.sorting_value]);

//   return (
//     <FilterContext.Provider
//       value={{
//         ...state,
//         setGridView,
//         setListView,
//         sorting,
//         updateFilterValue,
//         clearFilters,
//       }}
//     >
//       {children}
//     </FilterContext.Provider>
//   );
// };

// export const useFilterContext = () => {
//   return useContext(FilterContext);
// };


import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "../Context/ProductContex";
import filterReducer from "../Reducer/FilterReducer";

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
    // Add other filters if needed
  },
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(filterReducer, initialState);

  const setGridView = () => {
    dispatch({ type: "SET_GRID_VIEW" });
  };

  const setListView = () => {
    dispatch({ type: "SET_LIST_VIEW" });
  };

  const sorting = (event) => {
    const userValue = event.target.value;
    dispatch({ type: "SET_SORT", payload: userValue });
  };

  const updateFilterValue = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch({ type: "UPDATE_FILTERS", payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

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

export const useFilterContext = () => {
  return useContext(FilterContext);
};
