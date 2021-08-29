import {GET_TEMPLATES, ADD_TEMPLATE, UPDATE_TEMPLATE, DELETE_TEMPLATE, GET_FILTER_TEMPLATES} from "./TemplatesTypes";

const initialState = {
  templates: [],
  set_templates: {},
};

export const templatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEMPLATES:
      return {
        ...state,
        templates: action.payload
      };
    case ADD_TEMPLATE:
      return {
        ...state,
        templates: [...state.templates, action.payload]
      };
    case DELETE_TEMPLATE:
      return {
        ...state,
        templates: state.templates.filter((item, index) => item.id !== action.payload)
      };
    case UPDATE_TEMPLATE:
      const updatedTemplates = state.templates.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      return {
        ...state,
        templates: updatedTemplates
      };
    case GET_FILTER_TEMPLATES:

      let copy_set_templates = { ...state.set_templates}; //create a new copy
      copy_set_templates[action.payload.query] = action.payload.templates;
      console.log({
        ...state,
        set_templates: copy_set_templates
      })
      return {
        ...state,
        set_templates: copy_set_templates
      };
    default:
      return state;
  }
};

//
// this.setState(oldState => {
//   return {
//     foo: {
//       ...oldState.foo,
//       [keyToChange]: value
//     }
//   }
// });