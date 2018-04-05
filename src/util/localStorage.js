export const loadState = () => {
  try {
    const state = localStorage.getItem('state');
    if (state === null || state === undefined) {
      return undefined;
    } else {
      return JSON.parse(state);
    }
  } catch(e) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch(e) {
    // do something
  }
}