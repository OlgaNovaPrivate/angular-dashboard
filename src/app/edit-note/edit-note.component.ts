import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { NoteService } from '../shared/note/note-service/note.service';
import { Note } from '../shared/note/note-model/note.model';
import { NotificationService } from '../shared/notification/notification-service/notification.service';

/**
 * Visual Flow
 *  1.	User navigates to /edit-note/123.
 *  2.	The component is initialized, and ngOnInit runs.
 *  3.	The id is extracted from the route, and getNote fetches the note.
 *  4.	The note is assigned to this.note and displayed in the UI.
 *  5.	When the user submits the form, onFormSubmit logs the updated values.
 */

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.scss',
})
export class EditNoteComponent implements OnInit {
  note!: Note;
  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    //  this.route.paramMap.subscribe Subscribes to changes in the route’s parameters (like id)
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // extracts the id from the route
      const idParam = paramMap.get('id');
      // 	If idParam is missing, the component logs an error and stops further execution with a return
      if (!idParam) {
        console.error('ID parameter is missing');
        return;
      }

      console.log('Param logged', idParam);
      const note = this.noteService.getNote(idParam); // calls a method in the service to fetch the note with the given id
      if (!note) {
        // If no note is found (note is undefined), it logs an error and stops further execution
        console.error(`Note with ID ${idParam} not found`);
        // If the note is found, it assigns it to this.note. This makes the note available for the component’s template
        return;
      }

      this.note = note;
    });
  }
  // form: NgForm: Represents the submitted form and its data
  onFormSubmit(form: NgForm) {
    // this method is triggered when the user submits the form
    this.noteService.updateNote(this.note.id, form.value);
    this.notificationService.show('Updated note!');
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

  deleteNote() {
    this.noteService.deleteNote(this.note.id);
    this.notificationService.show('Deleted note!');
    this.router
      .navigateByUrl('/notes')
      /**
       * The component handles missing id or notes gracefully by logging
       * errors and stopping execution.
       */
      .then(() => {
        console.log('Navigation successful');
      })
      .catch(err => {
        console.error('Navigation error', err);
      });

    return;
  }
}
