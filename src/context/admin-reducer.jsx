import APIURL from "../utils/environment";

const adminReducer = (state, action) => {
     switch (action.type) {
         case "SET_EMAIL": {
             return { 
                ...state, 
                email: action.payload.email, 
         }
        }
        case "SET_PASSWORD": {
            return {
                ...state,
                password: action.payload.password,
            }
        }
         
         default: {
         return state;
     }

     
     }

}

export default adminReducer;