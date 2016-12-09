export default function tag (state={
  editValued: {},
}, action){
  switch(action.type) {

    case 'UPDATE_INPUT': 
      return {
        ...state, ...action.data,
      };
    default:
      return state
  }
}
