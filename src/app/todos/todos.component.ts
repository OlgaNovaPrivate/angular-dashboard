import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo/todo-model/todo.model';
import { TodoService } from '../shared/todo/todo-service/todo.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, RouterLink, TodoItemComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
  animations: [
    trigger('todoItemAnim', [
      transition(':leave', [
        animate(
          200,
          style({
            opacity: 0,
            height: 0,
            marginBottom: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  toggleCompleted(todo: Todo) {
    this.todoService.updateTodo(todo.id, { completed: !todo.completed });
  }

  onEditClick(todo: Todo) {
    this.router
      .navigate(['/todos', todo.id])
      .then(() => {
        console.log('Navigation successful');
      })
      .catch(err => {
        console.error('Navigation error', err);
      });

    return;
  }

  onDelete(todo: Todo) {
    this.todoService.deleteTodo(todo.id);
  }
}
