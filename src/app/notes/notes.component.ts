import { Component, OnInit } from '@angular/core';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NoteCardComponent } from '../note-card/note-card.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, RouterLink, NoteCardComponent], // CommonModule for *ngFor (standalone thing)
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) {
    console.log('NotesComponent constructor called');
  }

  ngOnInit(): void {
    console.log('Component Initialized');
    this.notes = this.noteService.getNotes();
    console.log('Notes loaded in component:', this.notes); // notes are loaded
  }
}
