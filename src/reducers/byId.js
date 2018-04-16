const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todo
    };
  }
  return state;
};

export default byId;

export const getTodo = (state, id) => state[id];