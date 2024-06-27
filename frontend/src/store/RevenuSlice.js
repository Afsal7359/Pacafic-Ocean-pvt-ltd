export const AddtoRevenuStore = (item) => {
    return {
      type: 'ADD_TO_REVENUE',
      payload: item,
    };
  };
  
  
  export const RemoveRevenuStore = (item) => {
    return {
      type: 'REMOVE_FROM_REVENUE',
      payload: item,
    };
  };
  export const ClearStore =()=>{
    return{
        type:'CLEAR_STORE'
    }
  }
  

  
  
  // reducers.js
  const initialState = {
    Revenustore: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case 'REMOVE_FROM_REVENUE':
        const itemToRemove = action.payload;
        const updatedCartItems = state.cartItems.filter(item => item.name !== itemToRemove.name);
  
        return {
          ...state,
          cartItems: updatedCartItems,
        };
  
        case 'ADD_TO_REVENUE':
        return {
          ...state,
          selectedshop: action.payload,
        };
       
  
      case 'CLEAR_STORE':
        return {
          ...state,
          cartItems: [],
        };
       
      default:
        return state;
    }
  };
  
  export default cartReducer;