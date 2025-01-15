const initialState = {
  tasks: [],
  isAuthenticated: false
};

// Reducer for task management
export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
      case 'LOGIN':
    return { ...state, isAuthenticated: true };
  case 'LOGOUT':
    return { ...state, isAuthenticated: false };
    default:
      return state;
    case 'TOGGLE_TASK':
    return {
      ...state,
      tasks: state.tasks.map(task =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      ),
    };
    case "TOGGLE_IMPORTANT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, isImportant: !task.isImportant }
            : task
        ),
      };
  }
};