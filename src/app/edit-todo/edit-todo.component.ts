import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { TodoService } from '../shared/todo/todo-service/todo.service';
import { Todo } from '../shared/todo/todo-model/todo.model';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss',
})
export class EditTodoComponent implements OnInit {
  todo?: Todo;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const todoId = paramMap.get('id');
      if (todoId != null) {
        this.todo = this.todoService.getTodo(todoId);
      }
    });
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid || !this.todo) return;

    this.todoService.updateTodo(this.todo.id, form.value);
    this.router
      .navigateByUrl('/todos')
      .then(() => {
        console.log('Navigation successful');
      })
      .catch(err => {
        console.error('Navigation error', err);
      });
  }
}
