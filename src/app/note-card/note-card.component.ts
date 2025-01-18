import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Note } from '../shared/note.model';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent {
  @Input() note?: Note;

  constructor() {}

  ngOnInit(): void {}
}
