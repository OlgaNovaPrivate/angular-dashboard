import { Component, Input } from '@angular/core';
import { Todo } from '../shared/todo/todo-model/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() todo?: Todo;
  constructor() {}
}
