import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo/todo-model/todo.model';
import { TodoService } from '../shared/todo/todo-service/todo.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, RouterLink, TodoItemComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {
    console.log('TodoService constructor called');
  }

  ngOnInit(): void {
    console.log('Component Initialized');
    this.todos = this.todoService.getTodos();
    console.log('Todos loaded in component:', this.todos); // todos are loaded
    console.log('Todo data', this.todos);
  }
}
