import { GET_COLLECTIONS, ADD_COLLECTION, UPDATE_COLLECTION, DELETE_COLLECTION } from "./CollectionsTypes";

const initialState = {
  collections: []
};

export const collectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLECTIONS:
      return {
        ...state,
        collections: action.payload
      };
    case ADD_COLLECTION:
      return {
        ...state,
        collections: [...state.collections, action.payload]
      };
    case DELETE_COLLECTION:
      return {
        ...state,
        collections: state.collections.filter((item, index) => item.id !== action.payload)
      };
    case UPDATE_COLLECTION:
      const updatedCollections = state.collections.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      return {
        ...state,
        collections: updatedCollections
      };
    default:
      return state;
  }
};
