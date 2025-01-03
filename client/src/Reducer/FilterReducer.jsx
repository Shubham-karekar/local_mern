
const initialState = {
    filter_products: [],
    all_products: [],
    filters: {
      text: '',
      category: 'all',
      company: 'all',
      color: 'all',
      // Add more filter options as needed
    },
    sorting_value: 'lowest', // Default sorting value
  };

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_FILTER_PRODUCTS':
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
      };

    case 'UPDATE_FILTERS':
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case 'FILTER_PRODUCTS':
      let filteredProducts = [...state.all_products];
      const { text, category, company } = state.filters;

      // Apply filters based on state.filters
      if (text) {
        filteredProducts = filteredProducts.filter(product => 
          product.name?.toLowerCase().includes(text.toLowerCase())
        );
      }
      if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
          product.category?.toLowerCase() === category.toLowerCase()
        );
      }
      if (company !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
          product.company?.toLowerCase() === company.toLowerCase()
        );
      }

      // Implement other filters as per your requirement (color)

      return {
        ...state,
        filter_products: filteredProducts,
      };

    case 'SET_SORT':
      return {
        ...state,
        sorting_value: action.payload,
      };

    case 'SORT_PRODUCTS':
      let sortedProducts = [...state.filter_products];

      switch (state.sorting_value) {
        case 'lowest':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'highest':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'a-z':
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'z-a':
          sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }

      return {
        ...state,
        filter_products: sortedProducts,
      };

    default:
      return state;
  }
};

export default filterReducer;
