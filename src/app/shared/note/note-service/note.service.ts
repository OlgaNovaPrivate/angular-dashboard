import { Injectable } from '@angular/core';
import { Note } from '../note-model/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notes: Note[] = [
    new Note('Test Title', 'Test Content'),
    new Note('Test Title2', 'Test Content2'),
  ];

  constructor() {}

  getNotes() {
    console.log('getNotes called in service');
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find(n => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    note
      ? Object.assign(note, updatedFields)
      : console.error(`Note with id ${id} not found`);
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id);
    if (noteIndex == -1) return;

    this.notes.splice(noteIndex, 1);
  }
}
