import { Component } from '@angular/core';
import { BookmarkTileComponent } from '../bookmark-tile/bookmark-tile.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [BookmarkTileComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {}
