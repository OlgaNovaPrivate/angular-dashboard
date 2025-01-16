import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  constructor(private _router: Router) {}
  ngOnInit() {}
}
