import uuid from 'uuid/v4';

const fakeDatabase = {
  todos: [{
    id: uuid(),
    text: 'yo',
    completed: true
  }, {
    id: uuid(),
    text: 'go shopping',
    completed: false
  }, {
    id: uuid(),
    text: 'have dinner',
    completed: true
  }]
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) => {
  if (Math.random() > 0.5) {
    return Promise.reject(new Error('Boom!'));
  }

  return delay(500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'active':
        return fakeDatabase.todos.filter(t => !t.completed);
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });
}