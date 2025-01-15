// Actions for tasks
export const addTask = task => ({ type: 'ADD_TASK', payload: task });
export const deleteTask = id => ({ type: 'DELETE_TASK', payload: id });

// Actions for authentication

export const login = () => ({ type: 'LOGIN' });
export const logout = () => ({ type: 'LOGOUT' });

export const toggleTask = id => ({ type: 'TOGGLE_TASK', payload: id });

export const toggleImportantTask = (id) => ({
    type: "TOGGLE_IMPORTANT_TASK",
    payload: id,
  });