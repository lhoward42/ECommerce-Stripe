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
         case "REGISTER": {
             fetch(`${APIURL}/admin/register`, {
                 method: 'POST',
                 headers: new Headers ({
                     'Content-Type': 'application/json'
                 }),
                 body: JSON.stringify(action.payload.newAdmin)
             })
             return {}
         }
         
         
         default: {
         return state;
     }

     
     }

}

export default adminReducer;