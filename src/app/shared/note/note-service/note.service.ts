import { Injectable, OnDestroy } from '@angular/core';
import { Note } from '../note-model/note.model';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService implements OnDestroy {
  notes: Note[] = [];

  storageListenSub: Subscription;

  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent<StorageEvent>(
      window,
      'storage'
    ).subscribe(event => {
      if (event.key === 'notes') this.loadState();
      console.log('Storage event fired!');
      console.log(event);
    });
  }

  ngOnDestroy() {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  getNotes() {
    console.log('getNotes called in service');
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find(n => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);

    this.saveState();
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    note
      ? Object.assign(note, updatedFields)
      : console.error(`Note with id ${id} not found`);

    this.saveState();
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id);
    if (noteIndex == -1) return;

    this.notes.splice(noteIndex, 1);

    this.saveState();
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadState() {
    try {
      const notesInStorage = localStorage.getItem('notes');
      const parsedNotes: Note[] = notesInStorage
        ? JSON.parse(notesInStorage)
        : [];

      this.notes.length = 0;
      this.notes.push(...parsedNotes);
    } catch (error) {
      console.error(
        'There was an error retrieving notes from local storage!',
        error
      );
      this.notes = [];
    }
  }
}
