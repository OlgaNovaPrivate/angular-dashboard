import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TodoService } from '../shared/todo/todo-service/todo.service';
import { Todo } from '../shared/todo/todo-model/todo.model';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
})
export class AddTodoComponent implements OnInit {
  showValidationErrors?: boolean;
  constructor(
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onFormSubmit(form: NgForm) {
    if (form.invalid) return (this.showValidationErrors = true);

    const todo = new Todo(form.value.text);
    this.todoService.addTodo(todo);
    this.router
      .navigateByUrl('/todos')
      .then(() => {
        console.log('Navigation successful');
      })
      .catch(err => {
        console.error('Navigation error', err);
      });

    return;
  }
}
