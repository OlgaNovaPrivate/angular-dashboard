import { Component, OnInit } from '@angular/core';
import { BookmarkTileComponent } from '../bookmark-tile/bookmark-tile.component';
import { Bookmark } from '../shared/bookmark/bookmark-model/bookmark.model';
import { BookmarkService } from '../shared/bookmark/bookmark-service/bookmark.service';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [BookmarkTileComponent, NgForOf, RouterLink],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.scss',
})
export class BookmarksComponent implements OnInit {
  bookmarks?: Bookmark[];

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks();
  }
}
