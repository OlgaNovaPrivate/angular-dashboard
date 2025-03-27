import { Injectable } from '@angular/core';
import { Todo } from '../todo-model/todo.model';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];

  storageListenSub: Subscription;

  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent<StorageEvent>(
      window,
      'storage'
    ).subscribe(event => {
      if (event.key === 'todos') this.loadState();
      console.log('Storage event fired!');
      console.log(event);
    });
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id === id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);

    this.saveState();
  }

  updateTodo(id: string, updatedTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id);
    if (!todo) {
      throw new Error(`Todo with ID ${id} not found.`);
    }
    Object.assign(todo, updatedTodoFields);

    this.saveState();
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index == -1) return;

    this.todos.splice(index, 1);

    this.saveState();
  }

  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadState() {
    try {
      const todosInStorage = localStorage.getItem('todos');
      const parsedTodos: Todo[] = todosInStorage
        ? JSON.parse(todosInStorage)
        : [];

      this.todos.length = 0;
      this.todos.push(...parsedTodos);
    } catch (error) {
      console.error(
        'There was an error retrieving todos from local storage!',
        error
      );
      this.todos = [];
    }
  }
}
