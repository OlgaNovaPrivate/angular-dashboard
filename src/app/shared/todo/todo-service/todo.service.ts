import { Injectable } from '@angular/core';
import { Todo } from '../todo-model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [new Todo('This is a test!'), new Todo('This is a test!')];

  constructor() {
    this.todos[0].completed = true;
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id === id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  updateTodo(id: string) {
    const todo = this.getTodo(id);
    if (!todo) {
      throw new Error(`Todo with ID ${id} not found.`);
    }
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id);
    if (index == -1) return;

    this.todos.splice(index, 1);
  }
}
