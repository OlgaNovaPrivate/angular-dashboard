import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark/bookmark-model/bookmark.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-bookmark-tile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './bookmark-tile.component.html',
  styleUrl: './bookmark-tile.component.scss',
})
export class BookmarkTileComponent implements OnInit {
  @Input() bookmark?: Bookmark;
  tileIconSrc?: string;

  faviconError?: boolean;

  constructor() {}

  get bookmarkInitial(): string {
    return this.bookmark?.name ? this.bookmark.name.toUpperCase()[0] : '';
  }

  ngOnInit(): void {
    this.tileIconSrc = this.bookmark?.url.origin + '/favicon.ico';
  }
}
