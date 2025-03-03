import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark/bookmark-model/bookmark.model';

@Component({
  selector: 'app-bookmark-tile',
  standalone: true,
  imports: [],
  templateUrl: './bookmark-tile.component.html',
  styleUrl: './bookmark-tile.component.scss',
})
export class BookmarkTileComponent implements OnInit {
  @Input() bookmark?: Bookmark;
  tileIconSrc?: string;

  ngOnInit(): void {
    this.tileIconSrc = this.bookmark?.url.origin + '/favicon.ico';
  }
}
