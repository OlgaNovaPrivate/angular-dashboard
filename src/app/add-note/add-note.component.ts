import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Note } from '../shared/note/note-model/note.model';
import { NoteService } from '../shared/note/note-service/note.service';
import { NgIf } from '@angular/common';
import { NotificationService } from '../shared/notification/notification-service/notification.service';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.scss',
})

/**
 * defining component:
 * class, that represents Angular component,
 * handling the logic and interaction for a part of the application.
 */
export class AddNoteComponent {
  showValidationErrors?: boolean;
  constructor(
    private noteService: NoteService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  /**
   * class, that represents Angular component,
   * handling the logic and interaction for a part of the application.
   */

  onFormSubmit(form: NgForm): void {
    console.log('Form is submitted', form);

    if (form.invalid) {
      this.showValidationErrors = true;
      return;
    }

    const note = new Note(form.value.title, form.value.content);
    this.noteService.addNote(note);
    this.notificationService.show('Created note!');

    this.router
      .navigateByUrl('/notes')
      .then(() => {
        console.log('Navigation successful');
      })
      .catch(err => {
        console.error('Navigation error', err);
      });

    return;
  }
}
