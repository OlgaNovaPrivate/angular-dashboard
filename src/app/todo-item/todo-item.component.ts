import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../shared/todo/todo-model/todo.model';
import { NotificationService } from '../shared/notification/notification-service/notification.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() todo?: Todo;

  @Output() editClick: EventEmitter<void> = new EventEmitter();
  @Output() deleteClick: EventEmitter<void> = new EventEmitter();

  constructor(private notificationService: NotificationService) {
    console.log('THIS IS TODO', this.todo);
  }

  onEditClick() {
    this.editClick.emit();
  }

  onDeleteClick() {
    this.deleteClick.emit();
    this.notificationService.show('Deleted todo!');
  }
}
